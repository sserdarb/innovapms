import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsBoolean,
    IsUUID,
    IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus } from '../entities/room.entity';

export class CreateRoomDto {
    @ApiProperty({ description: 'Otel ID' })
    @IsUUID()
    @IsNotEmpty()
    hotelId: string;

    @ApiProperty({ description: 'Oda tipi ID' })
    @IsUUID()
    @IsNotEmpty()
    roomTypeId: string;

    @ApiProperty({ description: 'Oda numarası', example: '101' })
    @IsString()
    @IsNotEmpty()
    roomNumber: string;

    @ApiProperty({ description: 'Kat', required: false })
    @IsNumber()
    @IsOptional()
    floor?: number;

    @ApiProperty({ description: 'Notlar', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}

export class UpdateRoomDto {
    @ApiProperty({ description: 'Oda tipi ID', required: false })
    @IsUUID()
    @IsOptional()
    roomTypeId?: string;

    @ApiProperty({ description: 'Kat', required: false })
    @IsNumber()
    @IsOptional()
    floor?: number;

    @ApiProperty({ description: 'Durum', enum: RoomStatus, required: false })
    @IsEnum(RoomStatus)
    @IsOptional()
    status?: RoomStatus;

    @ApiProperty({ description: 'Aktif durumu', required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({ description: 'Notlar', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}

export class UpdateRoomStatusDto {
    @ApiProperty({ description: 'Durum', enum: RoomStatus })
    @IsEnum(RoomStatus)
    @IsNotEmpty()
    status: RoomStatus;

    @ApiProperty({ description: 'Notlar', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}
