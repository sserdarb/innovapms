import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsArray,
    IsDate,
    IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApiKeyDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'API Key adı' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Açıklama', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'İzinler', type: [String] })
    @IsArray()
    @IsOptional()
    permissions?: string[];

    @ApiProperty({ description: 'Son kullanma tarihi', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    expiresAt?: Date;
}

export class UpdateApiKeyDto {
    @ApiProperty({ description: 'API Key adı', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Açıklama', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'İzinler', type: [String], required: false })
    @IsArray()
    @IsOptional()
    permissions?: string[];

    @ApiProperty({ description: 'Aktif mi?', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Son kullanma tarihi', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    expiresAt?: Date;
}
