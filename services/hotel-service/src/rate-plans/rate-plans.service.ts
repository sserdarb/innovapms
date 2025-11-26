import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { RatePlan } from '../entities/rate-plan.entity';
import { CreateRatePlanDto, UpdateRatePlanDto } from './dto/rate-plan.dto';

@Injectable()
export class RatePlansService {
    constructor(
        @InjectRepository(RatePlan)
        private ratePlanRepository: Repository<RatePlan>,
    ) { }

    async create(createRatePlanDto: CreateRatePlanDto): Promise<RatePlan> {
        if (createRatePlanDto.startDate >= createRatePlanDto.endDate) {
            throw new BadRequestException('Bitiş tarihi başlangıç tarihinden sonra olmalıdır');
        }

        const ratePlan = this.ratePlanRepository.create(createRatePlanDto);
        return this.ratePlanRepository.save(ratePlan);
    }

    async findAll(
        hotelId: string,
        rateCodeId?: string,
        roomTypeId?: string,
        startDate?: Date,
        endDate?: Date,
    ): Promise<RatePlan[]> {
        const where: any = { hotelId };

        if (rateCodeId) {
            where.rateCodeId = rateCodeId;
        }

        if (roomTypeId) {
            where.roomTypeId = roomTypeId;
        }

        if (startDate && endDate) {
            where.startDate = Between(startDate, endDate);
        }

        return this.ratePlanRepository.find({
            where,
            order: { startDate: 'ASC' },
        });
    }

    async findOne(id: string): Promise<RatePlan> {
        const ratePlan = await this.ratePlanRepository.findOne({ where: { id } });

        if (!ratePlan) {
            throw new NotFoundException('Fiyat planı bulunamadı');
        }

        return ratePlan;
    }

    async update(id: string, updateRatePlanDto: UpdateRatePlanDto): Promise<RatePlan> {
        const ratePlan = await this.findOne(id);

        if (updateRatePlanDto.startDate && updateRatePlanDto.endDate) {
            if (updateRatePlanDto.startDate >= updateRatePlanDto.endDate) {
                throw new BadRequestException('Bitiş tarihi başlangıç tarihinden sonra olmalıdır');
            }
        }

        Object.assign(ratePlan, updateRatePlanDto);
        return this.ratePlanRepository.save(ratePlan);
    }

    async remove(id: string): Promise<void> {
        const ratePlan = await this.findOne(id);
        await this.ratePlanRepository.remove(ratePlan);
    }
}
