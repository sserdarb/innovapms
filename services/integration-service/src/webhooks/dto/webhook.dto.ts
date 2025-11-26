import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsArray,
    IsNumber,
    IsUUID,
    Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWebhookDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Webhook adı' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Webhook URL' })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ description: 'Dinlenecek event\'ler', type: [String] })
    @IsArray()
    @IsNotEmpty()
    events: string[];

    @ApiProperty({ description: 'Secret key', required: false })
    @IsString()
    @IsOptional()
    secret?: string;

    @ApiProperty({ description: 'Tekrar deneme sayısı', default: 3 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    retryCount?: number;

    @ApiProperty({ description: 'Timeout (saniye)', default: 30 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    timeoutSeconds?: number;
}

export class UpdateWebhookDto {
    @ApiProperty({ description: 'Webhook adı', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Webhook URL', required: false })
    @IsString()
    @IsOptional()
    url?: string;

    @ApiProperty({ description: 'Dinlenecek event\'ler', type: [String], required: false })
    @IsArray()
    @IsOptional()
    events?: string[];

    @ApiProperty({ description: 'Secret key', required: false })
    @IsString()
    @IsOptional()
    secret?: string;

    @ApiProperty({ description: 'Aktif mi?', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Tekrar deneme sayısı', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    retryCount?: number;

    @ApiProperty({ description: 'Timeout (saniye)', required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    timeoutSeconds?: number;
}
