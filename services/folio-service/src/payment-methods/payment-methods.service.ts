import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod, PaymentMethodType } from '../entities/payment-method.entity';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from './dto/payment-method.dto';

@Injectable()
export class PaymentMethodsService {
    constructor(
        @InjectRepository(PaymentMethod)
        private paymentMethodRepository: Repository<PaymentMethod>,
    ) { }

    async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {
        const existing = await this.paymentMethodRepository.findOne({
            where: {
                hotelId: createPaymentMethodDto.hotelId,
                code: createPaymentMethodDto.code,
            },
        });

        if (existing) {
            throw new ConflictException('Bu otel için bu kod zaten mevcut');
        }

        const paymentMethod = this.paymentMethodRepository.create(createPaymentMethodDto);
        return this.paymentMethodRepository.save(paymentMethod);
    }

    async findAll(hotelId: string, type?: PaymentMethodType, isActive?: boolean): Promise<PaymentMethod[]> {
        const where: any = { hotelId };

        if (type) {
            where.type = type;
        }

        if (isActive !== undefined) {
            where.isActive = isActive;
        }

        return this.paymentMethodRepository.find({
            where,
            order: { code: 'ASC' },
        });
    }

    async findOne(id: string): Promise<PaymentMethod> {
        const paymentMethod = await this.paymentMethodRepository.findOne({ where: { id } });

        if (!paymentMethod) {
            throw new NotFoundException('Ödeme yöntemi bulunamadı');
        }

        return paymentMethod;
    }

    async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
        const paymentMethod = await this.findOne(id);

        Object.assign(paymentMethod, updatePaymentMethodDto);
        return this.paymentMethodRepository.save(paymentMethod);
    }

    async remove(id: string): Promise<void> {
        const paymentMethod = await this.findOne(id);
        await this.paymentMethodRepository.remove(paymentMethod);
    }
}
