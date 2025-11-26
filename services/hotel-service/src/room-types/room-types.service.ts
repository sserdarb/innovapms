import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from '../entities/room-type.entity';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './dto/room-type.dto';

@Injectable()
export class RoomTypesService {
    constructor(
        @InjectRepository(RoomType)
        private roomTypeRepository: Repository<RoomType>,
    ) { }

    async create(createRoomTypeDto: CreateRoomTypeDto): Promise<RoomType> {
        const existing = await this.roomTypeRepository.findOne({
            where: {
                hotelId: createRoomTypeDto.hotelId,
                code: createRoomTypeDto.code,
            },
        });

        if (existing) {
            throw new ConflictException('Bu oda tipi kodu zaten kullanımda');
        }

        const roomType = this.roomTypeRepository.create(createRoomTypeDto);
        return this.roomTypeRepository.save(roomType);
    }

    async findAll(hotelId: string): Promise<RoomType[]> {
        return this.roomTypeRepository.find({
            where: { hotelId, isActive: true },
            order: { name: 'ASC' },
        });
    }

    async findOne(id: string): Promise<RoomType> {
        const roomType = await this.roomTypeRepository.findOne({ where: { id } });

        if (!roomType) {
            throw new NotFoundException('Oda tipi bulunamadı');
        }

        return roomType;
    }

    async update(id: string, updateRoomTypeDto: UpdateRoomTypeDto): Promise<RoomType> {
        const roomType = await this.findOne(id);
        Object.assign(roomType, updateRoomTypeDto);
        return this.roomTypeRepository.save(roomType);
    }

    async remove(id: string): Promise<void> {
        const roomType = await this.findOne(id);
        await this.roomTypeRepository.remove(roomType);
    }
}
