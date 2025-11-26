import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RateCode } from '../entities/rate-code.entity';
import { CreateRateCodeDto, UpdateRateCodeDto } from './dto/rate-code.dto';

@Injectable()
export class RateCodesService {
    constructor(
        @InjectRepository(RateCode)
        private rateCodeRepository: Repository<RateCode>,
    ) { }

    async create(createRateCodeDto: CreateRateCodeDto): Promise<RateCode> {
        const existing = await this.rateCodeRepository.findOne({
            where: {
                hotelId: createRateCodeDto.hotelId,
                code: createRateCodeDto.code,
            },
        });

        if (existing) {
            throw new ConflictException('Bu otel için bu kod zaten mevcut');
        }

        const rateCode = this.rateCodeRepository.create(createRateCodeDto);
        return this.rateCodeRepository.save(rateCode);
    }

    async findAll(hotelId: string, isActive?: boolean): Promise<RateCode[]> {
        const where: any = { hotelId };
        if (isActive !== undefined) {
            where.isActive = isActive;
        }

        return this.rateCodeRepository.find({
            where,
            order: { code: 'ASC' },
        });
    }

    async findOne(id: string): Promise<RateCode> {
        const rateCode = await this.rateCodeRepository.findOne({ where: { id } });

        if (!rateCode) {
            throw new NotFoundException('Fiyat kodu bulunamadı');
        }

        return rateCode;
    }

    async update(id: string, updateRateCodeDto: UpdateRateCodeDto): Promise<RateCode> {
        const rateCode = await this.findOne(id);

        Object.assign(rateCode, updateRateCodeDto);
        return this.rateCodeRepository.save(rateCode);
    }

    async remove(id: string): Promise<void> {
        const rateCode = await this.findOne(id);
        await this.rateCodeRepository.remove(rateCode);
    }
}
