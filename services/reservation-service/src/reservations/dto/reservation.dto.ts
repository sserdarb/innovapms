import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsDate,
    IsEnum,
    IsArray,
    ValidateNested,
    IsUUID,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus, ReservationSource } from '../entities/reservation.entity';

export class ReservationRoomDto {
    @ApiProperty({ description: 'Oda tipi ID' })
    @IsUUID()
    @IsNotEmpty()
    roomTypeId: string;

    @ApiProperty({ description: 'Yetişkin sayısı' })
    @IsNumber()
    @Min(1)
    adults: number;

    @ApiProperty({ description: 'Çocuk sayısı', default: 0 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    children?: number;

    @ApiProperty({ description: 'Oda fiyatı' })
    @IsNumber()
    @IsOptional()
    rateAmount?: number;
}

export class GuestInfoDto {
    @ApiProperty({ description: 'Ad' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ description: 'Soyad' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: 'E-posta', required: false })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Telefon', required: false })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'Ana misafir mi?', default: false })
    @IsOptional()
    isPrimary?: boolean;
}

export class CreateReservationDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Giriş tarihi', example: '2024-02-01' })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    arrivalDate: Date;

    @ApiProperty({ description: 'Çıkış tarihi', example: '2024-02-05' })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    departureDate: Date;

    @ApiProperty({ description: 'Yetişkin sayısı' })
    @IsNumber()
    @Min(1)
    adults: number;

    @ApiProperty({ description: 'Çocuk sayısı', default: 0 })
    @IsNumber()
    @Min(0)
    @IsOptional()
    children?: number;

    @ApiProperty({ description: 'Kaynak', enum: ReservationSource })
    @IsEnum(ReservationSource)
    @IsOptional()
    source?: ReservationSource;

    @ApiProperty({ description: 'Fiyat kodu ID', required: false })
    @IsUUID()
    @IsOptional()
    rateCodeId?: string;

    @ApiProperty({ description: 'Odalar', type: [ReservationRoomDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReservationRoomDto)
    rooms: ReservationRoomDto[];

    @ApiProperty({ description: 'Misafirler', type: [GuestInfoDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GuestInfoDto)
    guests: GuestInfoDto[];

    @ApiProperty({ description: 'Özel istekler', required: false })
    @IsString()
    @IsOptional()
    specialRequests?: string;

    @ApiProperty({ description: 'Notlar', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}

export class UpdateReservationDto {
    @ApiProperty({ description: 'Giriş tarihi', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    arrivalDate?: Date;

    @ApiProperty({ description: 'Çıkış tarihi', required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    departureDate?: Date;

    @ApiProperty({ description: 'Yetişkin sayısı', required: false })
    @IsNumber()
    @Min(1)
    @IsOptional()
    adults?: number;

    @ApiProperty({ description: 'Çocuk sayısı', required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    children?: number;

    @ApiProperty({ description: 'Özel istekler', required: false })
    @IsString()
    @IsOptional()
    specialRequests?: string;

    @ApiProperty({ description: 'Notlar', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}

export class CancelReservationDto {
    @ApiProperty({ description: 'İptal nedeni' })
    @IsString()
    @IsNotEmpty()
    reason: string;

    @ApiProperty({ description: 'İade tutarı', required: false })
    @IsNumber()
    @IsOptional()
    refundAmount?: number;
}

export class CheckInDto {
    @ApiProperty({ description: 'Oda atamaları' })
    @IsArray()
    roomAssignments: Array<{
        reservationRoomId: string;
        roomId: string;
    }>;
}
