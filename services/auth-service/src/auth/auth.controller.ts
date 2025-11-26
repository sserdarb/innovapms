import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto, RefreshTokenDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Kullanıcı girişi' })
    @ApiResponse({
        status: 200,
        description: 'Başarılı giriş',
        type: LoginResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Geçersiz kimlik bilgileri' })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Token yenileme' })
    @ApiResponse({
        status: 200,
        description: 'Token başarıyla yenilendi',
        type: LoginResponseDto,
    })
    @ApiResponse({ status: 401, description: 'Geçersiz refresh token' })
    async refresh(
        @Body() refreshTokenDto: RefreshTokenDto,
    ): Promise<LoginResponseDto> {
        return this.authService.refreshToken(refreshTokenDto.refreshToken);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mevcut kullanıcı bilgilerini getir' })
    @ApiResponse({ status: 200, description: 'Kullanıcı bilgileri' })
    @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
    async getProfile(@Request() req) {
        const user = await this.authService.getUserById(req.user.sub);
        const { passwordHash, ...result } = user;
        return {
            success: true,
            data: result,
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Kullanıcı çıkışı' })
    @ApiResponse({ status: 200, description: 'Başarıyla çıkış yapıldı' })
    async logout() {
        // In a real implementation, you would invalidate the token here
        // For now, we just return success
        return {
            success: true,
            message: 'Başarıyla çıkış yapıldı',
        };
    }

    @Get('health')
    @ApiOperation({ summary: 'Servis sağlık kontrolü' })
    @ApiResponse({ status: 200, description: 'Servis çalışıyor' })
    health() {
        return {
            status: 'ok',
            service: 'auth-service',
            timestamp: new Date().toISOString(),
        };
    }
}
