import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsEnum,
    IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodType } from '../entities/payment-method.entity';

export class CreatePaymentMethodDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Kod' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Ad' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Tip', enum: PaymentMethodType })
    @IsEnum(PaymentMethodType)
    @IsNotEmpty()
    type: PaymentMethodType;

    @ApiProperty({ description: 'Aktif mi?', default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Referans gerekli mi?', default: false })
    @IsBoolean()
    @IsOptional()
    requiresReference?: boolean;

    @ApiProperty({ description: 'Muhasebe hesap kodu', required: false })
    @IsString()
    @IsOptional()
    glAccount?: string;
}

export class UpdatePaymentMethodDto {
    @ApiProperty({ description: 'Ad', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Aktif mi?', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Referans gerekli mi?', required: false })
    @IsBoolean()
    @IsOptional()
    requiresReference?: boolean;

    @ApiProperty({ description: 'Muhasebe hesap kodu', required: false })
    @IsString()
    @IsOptional()
    glAccount?: string;
}
