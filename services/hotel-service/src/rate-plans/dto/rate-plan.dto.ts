import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsDate,
    IsUUID,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatePlanDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Fiyat kodu ID' })
    @IsUUID()
    @IsNotEmpty()
    rateCodeId: string;

    @ApiProperty({ description: 'Oda tipi ID' })
    @IsUUID()
    @IsNotEmpty()
    roomTypeId: string;

    @ApiProperty({ description: 'Başlangıç tarihi', example: '2024-01-01' })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'Bitiş tarihi', example: '2024-12-31' })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'Fiyat' })
    @IsNumber()
    @Min(0)
    rate: number;

    @ApiProperty({ description: 'Para birimi kodu', default: 'TRY' })
    @IsString()
    @IsOptional()
    currencyCode?: string;

    @ApiProperty({ description: 'Aktif mi?', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class UpdateRatePlanDto {
    @ApiProperty({ description: 'Başlangıç tarihi', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startDate?: Date;

    @ApiProperty({ description: 'Bitiş tarihi', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'Fiyat', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    rate?: number;

    @ApiProperty({ description: 'Aktif mi?', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
