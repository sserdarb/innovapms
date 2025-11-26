import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'Kullanıcı adı',
        example: 'admin',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Şifre',
        example: 'admin123',
        minLength: 6,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class LoginResponseDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    user: {
        id: string;
        hotelId: string;
        username: string;
        email: string;
        firstName?: string;
        lastName?: string;
    };

    @ApiProperty()
    expiresIn: number;
}

export class RefreshTokenDto {
    @ApiProperty({
        description: 'Refresh token',
    })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}
