import {
    Injectable,
    BadRequestException,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Check if username already exists
        const existingUser = await this.userRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ],
        });

        if (existingUser) {
            throw new ConflictException('Kullanıcı adı veya e-posta zaten kullanımda');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(createUserDto.password, salt);

        // Get roles
        const roles = await this.roleRepository.findBy({
            id: In(createUserDto.roleIds),
        });

        if (roles.length !== createUserDto.roleIds.length) {
            throw new BadRequestException('Geçersiz rol ID\'leri');
        }

        // Create user
        const user = this.userRepository.create({
            hotelId: createUserDto.hotelId,
            username: createUserDto.username,
            email: createUserDto.email,
            passwordHash,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            phone: createUserDto.phone,
            roles,
        });

        return this.userRepository.save(user);
    }

    async findAll(hotelId: string): Promise<User[]> {
        return this.userRepository.find({
            where: { hotelId },
            relations: ['roles'],
        });
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['roles', 'roles.permissions'],
        });

        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamadı');
        }

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);

        // Check email uniqueness if changing
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.userRepository.findOne({
                where: { email: updateUserDto.email },
            });

            if (existingUser) {
                throw new ConflictException('E-posta zaten kullanımda');
            }
        }

        // Update roles if provided
        if (updateUserDto.roleIds) {
            const roles = await this.roleRepository.findBy({
                id: In(updateUserDto.roleIds),
            });

            if (roles.length !== updateUserDto.roleIds.length) {
                throw new BadRequestException('Geçersiz rol ID\'leri');
            }

            user.roles = roles;
        }

        // Update other fields
        Object.assign(user, {
            email: updateUserDto.email ?? user.email,
            firstName: updateUserDto.firstName ?? user.firstName,
            lastName: updateUserDto.lastName ?? user.lastName,
            phone: updateUserDto.phone ?? user.phone,
            isActive: updateUserDto.isActive ?? user.isActive,
        });

        return this.userRepository.save(user);
    }

    async changePassword(
        userId: string,
        changePasswordDto: ChangePasswordDto,
    ): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new NotFoundException('Kullanıcı bulunamadı');
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(
            changePasswordDto.currentPassword,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new BadRequestException('Mevcut şifre yanlış');
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(changePasswordDto.newPassword, salt);

        await this.userRepository.update(userId, { passwordHash });
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
}
