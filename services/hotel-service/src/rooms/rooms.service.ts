import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room, RoomStatus } from '../entities/room.entity';
import { CreateRoomDto, UpdateRoomDto, UpdateRoomStatusDto } from './dto/room.dto';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private roomRepository: Repository<Room>,
    ) { }

    async create(createRoomDto: CreateRoomDto): Promise<Room> {
        const existing = await this.roomRepository.findOne({
            where: {
                hotelId: createRoomDto.hotelId,
                roomNumber: createRoomDto.roomNumber,
            },
        });

        if (existing) {
            throw new ConflictException('Bu oda numarası zaten kullanımda');
        }

        const room = this.roomRepository.create(createRoomDto);
        return this.roomRepository.save(room);
    }

    async findAll(hotelId: string, status?: RoomStatus): Promise<Room[]> {
        const where: any = { hotelId, isActive: true };
        if (status) {
            where.status = status;
        }

        return this.roomRepository.find({
            where,
            relations: ['roomType'],
            order: { roomNumber: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Room> {
        const room = await this.roomRepository.findOne({
            where: { id },
            relations: ['roomType'],
        });

        if (!room) {
            throw new NotFoundException('Oda bulunamadı');
        }

        return room;
    }

    async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
        const room = await this.findOne(id);
        Object.assign(room, updateRoomDto);
        return this.roomRepository.save(room);
    }

    async updateStatus(id: string, updateStatusDto: UpdateRoomStatusDto): Promise<Room> {
        const room = await this.findOne(id);
        room.status = updateStatusDto.status;
        if (updateStatusDto.notes) {
            room.notes = updateStatusDto.notes;
        }
        return this.roomRepository.save(room);
    }

    async remove(id: string): Promise<void> {
        const room = await this.findOne(id);
        await this.roomRepository.remove(room);
    }
}
