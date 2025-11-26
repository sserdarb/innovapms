import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

export enum PaymentMethodType {
    CASH = 'cash',
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    BANK_TRANSFER = 'bank_transfer',
    CHECK = 'check',
    VOUCHER = 'voucher',
    CITY_LEDGER = 'city_ledger',
}

@Entity('payment_methods')
export class PaymentMethod {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: PaymentMethodType,
    })
    type: PaymentMethodType;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'requires_reference', default: false })
    requiresReference: boolean;

    @Column({ name: 'gl_account', nullable: true })
    glAccount?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
