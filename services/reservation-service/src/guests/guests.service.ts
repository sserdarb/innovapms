import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Guest, GuestType } from '../entities/guest.entity';
import { CreateGuestDto, UpdateGuestDto } from './dto/guest.dto';

@Injectable()
export class GuestsService {
    constructor(
        @InjectRepository(Guest)
        private guestRepository: Repository<Guest>,
    ) { }

    async create(createGuestDto: CreateGuestDto): Promise<Guest> {
        const guest = this.guestRepository.create(createGuestDto);
        return this.guestRepository.save(guest);
    }

    async findAll(
        hotelId: string,
        search?: string,
        type?: GuestType,
        vipStatus?: boolean,
    ): Promise<Guest[]> {
        const where: any = { hotelId };

        if (type) {
            where.type = type;
        }

        if (vipStatus !== undefined) {
            where.vipStatus = vipStatus;
        }

        const queryBuilder = this.guestRepository.createQueryBuilder('guest');
        queryBuilder.where(where);

        if (search) {
            queryBuilder.andWhere(
                '(guest.firstName ILIKE :search OR guest.lastName ILIKE :search OR guest.email ILIKE :search OR guest.phone ILIKE :search)',
                { search: `%${search}%` },
            );
        }

        return queryBuilder.orderBy('guest.lastName', 'ASC').getMany();
    }

    async findOne(id: string): Promise<Guest> {
        const guest = await this.guestRepository.findOne({ where: { id } });

        if (!guest) {
            throw new NotFoundException('Misafir bulunamadı');
        }

        return guest;
    }

    async findByEmail(email: string, hotelId: string): Promise<Guest | null> {
        return this.guestRepository.findOne({ where: { email, hotelId } });
    }

    async update(id: string, updateGuestDto: UpdateGuestDto): Promise<Guest> {
        const guest = await this.findOne(id);

        Object.assign(guest, updateGuestDto);
        return this.guestRepository.save(guest);
    }

    async remove(id: string): Promise<void> {
        const guest = await this.findOne(id);
        await this.guestRepository.remove(guest);
    }
}
