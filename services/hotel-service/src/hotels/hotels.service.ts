import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from '../entities/hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from './dto/hotel.dto';

@Injectable()
export class HotelsService {
    constructor(
        @InjectRepository(Hotel)
        private hotelRepository: Repository<Hotel>,
    ) { }

    async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
        const existingHotel = await this.hotelRepository.findOne({
            where: { code: createHotelDto.code },
        });

        if (existingHotel) {
            throw new ConflictException('Bu otel kodu zaten kullanımda');
        }

        const hotel = this.hotelRepository.create(createHotelDto);
        return this.hotelRepository.save(hotel);
    }

    async findAll(): Promise<Hotel[]> {
        return this.hotelRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({ where: { id } });

        if (!hotel) {
            throw new NotFoundException('Otel bulunamadı');
        }

        return hotel;
    }

    async findByCode(code: string): Promise<Hotel> {
        const hotel = await this.hotelRepository.findOne({ where: { code } });

        if (!hotel) {
            throw new NotFoundException('Otel bulunamadı');
        }

        return hotel;
    }

    async update(id: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
        const hotel = await this.findOne(id);

        Object.assign(hotel, updateHotelDto);

        return this.hotelRepository.save(hotel);
    }

    async remove(id: string): Promise<void> {
        const hotel = await this.findOne(id);
        await this.hotelRepository.remove(hotel);
    }
}
