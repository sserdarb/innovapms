import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsBoolean,
    IsArray,
    IsUUID,
    Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomTypeDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Oda tipi kodu', example: 'STD' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Oda tipi adı', example: 'Standard Room' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Açıklama', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Maksimum yetişkin sayısı', default: 2 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    maxAdults?: number;

    @ApiProperty({ description: 'Maksimum çocuk sayısı', default: 0 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    maxChildren?: number;

    @ApiProperty({ description: 'Maksimum kapasite', default: 2 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    maxOccupancy?: number;

    @ApiProperty({ description: 'Temel fiyat', required: false })
    @IsNumber()
    @IsOptional()
    basePrice?: number;

    @ApiProperty({ description: 'Ekstra yatak fiyatı', required: false })
    @IsNumber()
    @IsOptional()
    extraBedPrice?: number;

    @ApiProperty({ description: 'Olanaklar', type: [String], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    amenities?: string[];
}

export class UpdateRoomTypeDto {
    @ApiProperty({ description: 'Oda tipi adı', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Açıklama', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Maksimum yetişkin sayısı', required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    maxAdults?: number;

    @ApiProperty({ description: 'Maksimum çocuk sayısı', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    maxChildren?: number;

    @ApiProperty({ description: 'Maksimum kapasite', required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    maxOccupancy?: number;

    @ApiProperty({ description: 'Temel fiyat', required: false })
    @IsNumber()
    @IsOptional()
    basePrice?: number;

    @ApiProperty({ description: 'Ekstra yatak fiyatı', required: false })
    @IsNumber()
    @IsOptional()
    extraBedPrice?: number;

    @ApiProperty({ description: 'Olanaklar', type: [String], required: false })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    amenities?: string[];

    @ApiProperty({ description: 'Aktif durumu', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
