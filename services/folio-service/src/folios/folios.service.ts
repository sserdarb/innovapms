import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folio, FolioStatus } from '../entities/folio.entity';
import { FolioTransaction, TransactionType } from '../entities/folio-transaction.entity';
import {
    CreateFolioDto,
    AddChargeDto,
    AddPaymentDto,
    TransferFolioDto,
} from './dto/folio.dto';

@Injectable()
export class FoliosService {
    constructor(
        @InjectRepository(Folio)
        private folioRepository: Repository<Folio>,
        @InjectRepository(FolioTransaction)
        private transactionRepository: Repository<FolioTransaction>,
    ) { }

    async create(createFolioDto: CreateFolioDto): Promise<Folio> {
        const folioNumber = await this.generateFolioNumber(createFolioDto.hotelId);

        const folio = this.folioRepository.create({
            ...createFolioDto,
            folioNumber,
            status: FolioStatus.OPEN,
        });

        return this.folioRepository.save(folio);
    }

    async findAll(hotelId: string, status?: FolioStatus): Promise<Folio[]> {
        const where: any = { hotelId };
        if (status) {
            where.status = status;
        }

        return this.folioRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Folio> {
        const folio = await this.folioRepository.findOne({ where: { id } });

        if (!folio) {
            throw new NotFoundException('Folyo bulunamadı');
        }

        return folio;
    }

    async getTransactions(folioId: string): Promise<FolioTransaction[]> {
        await this.findOne(folioId); // Verify folio exists

        return this.transactionRepository.find({
            where: { folioId },
            order: { createdAt: 'ASC' },
        });
    }

    async addCharge(folioId: string, chargeDto: AddChargeDto): Promise<FolioTransaction> {
        const folio = await this.findOne(folioId);

        if (folio.status !== FolioStatus.OPEN) {
            throw new BadRequestException('Sadece açık folyolara işlem eklenebilir');
        }

        // Calculate tax
        const quantity = chargeDto.quantity || 1;
        const unitPrice = chargeDto.amount / quantity;
        const taxRate = chargeDto.taxRate || 0;
        const taxAmount = (chargeDto.amount * taxRate) / 100;
        const totalAmount = chargeDto.amount + taxAmount;

        const transaction = this.transactionRepository.create({
            folioId,
            type: TransactionType.CHARGE,
            department: chargeDto.department,
            description: chargeDto.description,
            amount: totalAmount,
            quantity,
            unitPrice,
            taxRate,
            taxAmount,
            referenceNumber: chargeDto.referenceNumber,
        });

        await this.transactionRepository.save(transaction);

        // Update folio totals
        await this.updateFolioTotals(folioId);

        return transaction;
    }

    async addPayment(folioId: string, paymentDto: AddPaymentDto): Promise<FolioTransaction> {
        const folio = await this.findOne(folioId);

        if (folio.status !== FolioStatus.OPEN) {
            throw new BadRequestException('Sadece açık folyolara ödeme alınabilir');
        }

        const transaction = this.transactionRepository.create({
            folioId,
            type: TransactionType.PAYMENT,
            department: 'payment',
            description: paymentDto.description || 'Ödeme',
            amount: paymentDto.amount,
            quantity: 1,
            referenceNumber: paymentDto.referenceNumber,
        });

        await this.transactionRepository.save(transaction);

        // Update folio totals
        await this.updateFolioTotals(folioId);

        return transaction;
    }

    async transfer(folioId: string, transferDto: TransferFolioDto): Promise<void> {
        const sourceFolio = await this.findOne(folioId);
        const targetFolio = await this.findOne(transferDto.targetFolioId);

        if (sourceFolio.status !== FolioStatus.OPEN) {
            throw new BadRequestException('Sadece açık folyolardan transfer yapılabilir');
        }

        if (targetFolio.status !== FolioStatus.OPEN) {
            throw new BadRequestException('Sadece açık folyolara transfer yapılabilir');
        }

        if (transferDto.amount > sourceFolio.balance) {
            throw new BadRequestException('Transfer tutarı folyo bakiyesinden fazla olamaz');
        }

        // Debit from source
        await this.transactionRepository.save({
            folioId: sourceFolio.id,
            type: TransactionType.PAYMENT,
            department: 'transfer',
            description: transferDto.description || `Transfer to ${targetFolio.folioNumber}`,
            amount: transferDto.amount,
            quantity: 1,
        });

        // Credit to target
        await this.transactionRepository.save({
            folioId: targetFolio.id,
            type: TransactionType.CHARGE,
            department: 'transfer',
            description: transferDto.description || `Transfer from ${sourceFolio.folioNumber}`,
            amount: transferDto.amount,
            quantity: 1,
        });

        // Update both folio totals
        await this.updateFolioTotals(sourceFolio.id);
        await this.updateFolioTotals(targetFolio.id);
    }

    async close(folioId: string): Promise<Folio> {
        const folio = await this.findOne(folioId);

        if (folio.status !== FolioStatus.OPEN) {
            throw new BadRequestException('Sadece açık folyolar kapatılabilir');
        }

        if (folio.balance > 0) {
            throw new BadRequestException('Bakiyesi olan folyo kapatılamaz');
        }

        folio.status = FolioStatus.CLOSED;
        folio.closedAt = new Date();

        return this.folioRepository.save(folio);
    }

    private async updateFolioTotals(folioId: string): Promise<void> {
        const transactions = await this.transactionRepository.find({
            where: { folioId },
        });

        let totalCharges = 0;
        let totalPayments = 0;

        for (const transaction of transactions) {
            if (transaction.type === TransactionType.CHARGE) {
                totalCharges += Number(transaction.amount);
            } else if (transaction.type === TransactionType.PAYMENT) {
                totalPayments += Number(transaction.amount);
            }
        }

        const balance = totalCharges - totalPayments;

        await this.folioRepository.update(folioId, {
            totalCharges,
            totalPayments,
            balance,
        });
    }

    private async generateFolioNumber(hotelId: string): Promise<string> {
        const year = new Date().getFullYear();
        const count = await this.folioRepository.count({ where: { hotelId } });

        return `F-${year}-${String(count + 1).padStart(5, '0')}`;
    }
}
