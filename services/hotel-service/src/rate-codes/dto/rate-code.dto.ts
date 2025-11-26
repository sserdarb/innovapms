import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsUUID,
    Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRateCodeDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Fiyat kodu' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Fiyat adı' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Açıklama', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Aktif mi?', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Herkese açık mı?', default: true })
    @IsBoolean()
    @IsOptional()
    isPublic?: boolean;

    @ApiProperty({ description: 'Minimum konaklama süresi', default: 1 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    minLos?: number;

    @ApiProperty({ description: 'Maximum konaklama süresi', required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    maxLos?: number;

    @ApiProperty({ description: 'Minimum önceden rezervasyon (gün)', default: 0 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    minAdvanceBooking?: number;

    @ApiProperty({ description: 'Maximum önceden rezervasyon (gün)', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    maxAdvanceBooking?: number;
}

export class UpdateRateCodeDto {
    @ApiProperty({ description: 'Fiyat adı', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Açıklama', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Aktif mi?', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Herkese açık mı?', required: false })
    @IsBoolean()
    @IsOptional()
    isPublic?: boolean;

    @ApiProperty({ description: 'Minimum konaklama süresi', required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    minLos?: number;

    @ApiProperty({ description: 'Maximum konaklama süresi', required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    maxLos?: number;

    @ApiProperty({ description: 'Minimum önceden rezervasyon (gün)', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    minAdvanceBooking?: number;

    @ApiProperty({ description: 'Maximum önceden rezervasyon (gün)', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    maxAdvanceBooking?: number;
}
