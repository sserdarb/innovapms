import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Folio } from './folio.entity';

export enum TransactionType {
    CHARGE = 'charge',
    PAYMENT = 'payment',
    REFUND = 'refund',
    ADJUSTMENT = 'adjustment',
}

@Entity('folio_transactions')
export class FolioTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'folio_id' })
    folioId: string;

    @Column({
        type: 'enum',
        enum: TransactionType,
    })
    type: TransactionType;

    @Column()
    department: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
    unitPrice?: number;

    @Column({ name: 'tax_rate', type: 'decimal', precision: 5, scale: 2, default: 0 })
    taxRate: number;

    @Column({ name: 'tax_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
    taxAmount: number;

    @Column({ name: 'reference_number', nullable: true })
    referenceNumber?: string;

    @Column({ name: 'posted_by', nullable: true })
    postedBy?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => Folio)
    @JoinColumn({ name: 'folio_id' })
    folio: Folio;
}
