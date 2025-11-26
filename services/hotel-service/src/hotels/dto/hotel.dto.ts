import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsEmail,
    IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {
    @ApiProperty({ description: 'Otel kodu', example: 'HOTEL001' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Otel adı', example: 'Grand Hotel' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Yasal ünvan', required: false })
    @IsString()
    @IsOptional()
    legalName?: string;

    @ApiProperty({ description: 'Vergi numarası', required: false })
    @IsString()
    @IsOptional()
    taxNumber?: string;

    @ApiProperty({ description: 'Adres', required: false })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ description: 'Şehir', required: false })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ description: 'Ülke', required: false })
    @IsString()
    @IsOptional()
    country?: string;

    @ApiProperty({ description: 'Telefon', required: false })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'E-posta', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Website', required: false })
    @IsString()
    @IsOptional()
    website?: string;

    @ApiProperty({ description: 'Para birimi kodu', default: 'TRY' })
    @IsString()
    @IsOptional()
    currencyCode?: string;

    @ApiProperty({ description: 'Zaman dilimi', default: 'Europe/Istanbul' })
    @IsString()
    @IsOptional()
    timezone?: string;

    @ApiProperty({ description: 'Ayarlar', required: false })
    @IsObject()
    @IsOptional()
    settings?: Record<string, any>;
}

export class UpdateHotelDto {
    @ApiProperty({ description: 'Otel adı', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Yasal ünvan', required: false })
    @IsString()
    @IsOptional()
    legalName?: string;

    @ApiProperty({ description: 'Vergi numarası', required: false })
    @IsString()
    @IsOptional()
    taxNumber?: string;

    @ApiProperty({ description: 'Adres', required: false })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty({ description: 'Şehir', required: false })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ description: 'Ülke', required: false })
    @IsString()
    @IsOptional()
    country?: string;

    @ApiProperty({ description: 'Telefon', required: false })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'E-posta', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Website', required: false })
    @IsString()
    @IsOptional()
    website?: string;

    @ApiProperty({ description: 'Para birimi kodu', required: false })
    @IsString()
    @IsOptional()
    currencyCode?: string;

    @ApiProperty({ description: 'Zaman dilimi', required: false })
    @IsString()
    @IsOptional()
    timezone?: string;

    @ApiProperty({ description: 'Aktif durumu', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Ayarlar', required: false })
    @IsObject()
    @IsOptional()
    settings?: Record<string, any>;
}
