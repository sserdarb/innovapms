import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsEnum,
    IsUUID,
    Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../entities/folio-transaction.entity';

export class CreateFolioDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Rezervasyon ID', required: false })
    @IsUUID()
    @IsOptional()
    reservationId?: string;

    @ApiProperty({ description: 'Misafir ID', required: false })
    @IsUUID()
    @IsOptional()
    guestId?: string;

    @ApiProperty({ description: 'Para birimi kodu', default: 'TRY' })
    @IsString()
    @IsOptional()
    currencyCode?: string;

    @ApiProperty({ description: 'Notlar', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}

export class AddChargeDto {
    @ApiProperty({ description: 'Departman', example: 'room' })
    @IsString()
    @IsNotEmpty()
    department: string;

    @ApiProperty({ description: 'Açıklama', example: 'Oda ücreti - 101' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Tutar' })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({ description: 'Miktar', default: 1 })
    @IsNumber()
    @Min(1)
    @IsOptional()
    quantity?: number;

    @ApiProperty({ description: 'Vergi oranı (%)', default: 0 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    taxRate?: number;

    @ApiProperty({ description: 'Referans numarası', required: false })
    @IsString()
    @IsOptional()
    referenceNumber?: string;
}

export class AddPaymentDto {
    @ApiProperty({ description: 'Ödeme yöntemi ID' })
    @IsUUID()
    @IsNotEmpty()
    paymentMethodId: string;

    @ApiProperty({ description: 'Tutar' })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({ description: 'Para birimi kodu', default: 'TRY' })
    @IsString()
    @IsOptional()
    currencyCode?: string;

    @ApiProperty({ description: 'Referans numarası', required: false })
    @IsString()
    @IsOptional()
    referenceNumber?: string;

    @ApiProperty({ description: 'Açıklama', required: false })
    @IsString()
    @IsOptional()
    description?: string;
}

export class TransferFolioDto {
    @ApiProperty({ description: 'Hedef folyo ID' })
    @IsUUID()
    @IsNotEmpty()
    targetFolioId: string;

    @ApiProperty({ description: 'Transfer tutarı' })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({ description: 'Açıklama', required: false })
    @IsString()
    @IsOptional()
    description?: string;
}
