import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
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
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni kullanıcı oluştur' })
    @ApiResponse({ status: 201, description: 'Kullanıcı başarıyla oluşturuldu' })
    @ApiResponse({ status: 409, description: 'Kullanıcı adı veya e-posta zaten kullanımda' })
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        const { passwordHash, ...result } = user;
        return {
            success: true,
            data: result,
        };
    }

    @Get()
    @ApiOperation({ summary: 'Tüm kullanıcıları listele' })
    @ApiResponse({ status: 200, description: 'Kullanıcı listesi' })
    async findAll(@Request() req) {
        const users = await this.usersService.findAll(req.user.hotelId);
        const sanitizedUsers = users.map(({ passwordHash, ...user }) => user);
        return {
            success: true,
            data: sanitizedUsers,
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Kullanıcı detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Kullanıcı detayları' })
    @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(id);
        const { passwordHash, ...result } = user;
        return {
            success: true,
            data: result,
        };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Kullanıcı bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Kullanıcı başarıyla güncellendi' })
    @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        const { passwordHash, ...result } = user;
        return {
            success: true,
            data: result,
        };
    }

    @Post(':id/change-password')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Kullanıcı şifresini değiştir' })
    @ApiResponse({ status: 200, description: 'Şifre başarıyla değiştirildi' })
    @ApiResponse({ status: 400, description: 'Mevcut şifre yanlış' })
    async changePassword(
        @Param('id') id: string,
        @Body() changePasswordDto: ChangePasswordDto,
    ) {
        await this.usersService.changePassword(id, changePasswordDto);
        return {
            success: true,
            message: 'Şifre başarıyla değiştirildi',
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Kullanıcıyı sil' })
    @ApiResponse({ status: 204, description: 'Kullanıcı başarıyla silindi' })
    @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
    async remove(@Param('id') id: string) {
        await this.usersService.remove(id);
    }
}
