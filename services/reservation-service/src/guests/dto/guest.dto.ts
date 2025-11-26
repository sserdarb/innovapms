import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsEmail,
    IsBoolean,
    IsDate,
    IsEnum,
    IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GuestType } from '../entities/guest.entity';

export class CreateGuestDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Ad' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: 'Soyad' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: 'E-posta', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Telefon', required: false })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'Uyruk', required: false })
    @IsString()
    @IsOptional()
    nationality?: string;

    @ApiProperty({ description: 'TC Kimlik No', required: false })
    @IsString()
    @IsOptional()
    idNumber?: string;

    @ApiProperty({ description: 'Pasaport No', required: false })
    @IsString()
    @IsOptional()
    passportNumber?: string;

    @ApiProperty({ description: 'Doğum tarihi', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    dateOfBirth?: Date;

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

    @ApiProperty({ description: 'Posta kodu', required: false })
    @IsString()
    @IsOptional()
    postalCode?: string;

    @ApiProperty({ description: 'Misafir tipi', enum: GuestType, default: GuestType.INDIVIDUAL })
    @IsEnum(GuestType)
    @IsOptional()
    type?: GuestType;

    @ApiProperty({ description: 'Şirket adı', required: false })
    @IsString()
    @IsOptional()
    companyName?: string;

    @ApiProperty({ description: 'Vergi numarası', required: false })
    @IsString()
    @IsOptional()
    taxNumber?: string;

    @ApiProperty({ description: 'VIP durumu', default: false })
    @IsBoolean()
    @IsOptional()
    vipStatus?: boolean;

    @ApiProperty({ description: 'Notlar', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}

export class UpdateGuestDto {
    @ApiProperty({ description: 'Ad', required: false })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiProperty({ description: 'Soyad', required: false })
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiProperty({ description: 'E-posta', required: false })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Telefon', required: false })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'Uyruk', required: false })
    @IsString()
    @IsOptional()
    nationality?: string;

    @ApiProperty({ description: 'TC Kimlik No', required: false })
    @IsString()
    @IsOptional()
    idNumber?: string;

    @ApiProperty({ description: 'Pasaport No', required: false })
    @IsString()
    @IsOptional()
    passportNumber?: string;

    @ApiProperty({ description: 'Doğum tarihi', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    dateOfBirth?: Date;

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

    @ApiProperty({ description: 'Posta kodu', required: false })
    @IsString()
    @IsOptional()
    postalCode?: string;

    @ApiProperty({ description: 'Şirket adı', required: false })
    @IsString()
    @IsOptional()
    companyName?: string;

    @ApiProperty({ description: 'Vergi numarası', required: false })
    @IsString()
    @IsOptional()
    taxNumber?: string;

    @ApiProperty({ description: 'VIP durumu', required: false })
    @IsBoolean()
    @IsOptional()
    vipStatus?: boolean;

    @ApiProperty({ description: 'Notlar', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}
