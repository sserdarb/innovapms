import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { username },
            relations: ['roles', 'roles.permissions'],
        });

        if (!user) {
            throw new UnauthorizedException('Geçersiz kullanıcı adı veya şifre');
        }

        if (!user.isActive) {
            throw new UnauthorizedException('Kullanıcı hesabı aktif değil');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Geçersiz kullanıcı adı veya şifre');
        }

        return user;
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.validateUser(loginDto.username, loginDto.password);

        // Extract permissions from roles
        const permissions = user.roles.reduce((acc, role) => {
            const rolePermissions = role.permissions.map((p) => p.name);
            return [...acc, ...rolePermissions];
        }, []);

        // Remove duplicates
        const uniquePermissions = [...new Set(permissions)];

        const payload = {
            sub: user.id,
            hotelId: user.hotelId,
            username: user.username,
            email: user.email,
            roles: user.roles.map((r) => r.name),
            permissions: uniquePermissions,
        };

        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') || '7d',
        });

        // Update last login
        await this.userRepository.update(user.id, {
            lastLoginAt: new Date(),
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                hotelId: user.hotelId,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            expiresIn: 86400, // 24 hours in seconds
        };
    }

    async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });

            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
                relations: ['roles', 'roles.permissions'],
            });

            if (!user || !user.isActive) {
                throw new UnauthorizedException('Geçersiz token');
            }

            // Generate new tokens
            const newPayload = {
                sub: user.id,
                hotelId: user.hotelId,
                username: user.username,
                email: user.email,
                roles: user.roles.map((r) => r.name),
                permissions: user.roles.reduce((acc, role) => {
                    const rolePermissions = role.permissions.map((p) => p.name);
                    return [...new Set([...acc, ...rolePermissions])];
                }, []),
            };

            const accessToken = this.jwtService.sign(newPayload);
            const newRefreshToken = this.jwtService.sign(newPayload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') || '7d',
            });

            return {
                accessToken,
                refreshToken: newRefreshToken,
                user: {
                    id: user.id,
                    hotelId: user.hotelId,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                expiresIn: 86400,
            };
        } catch (error) {
            throw new UnauthorizedException('Geçersiz veya süresi dolmuş token');
        }
    }

    async validateToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Geçersiz token');
        }
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['roles', 'roles.permissions'],
        });

        if (!user) {
            throw new BadRequestException('Kullanıcı bulunamadı');
        }

        return user;
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
}
