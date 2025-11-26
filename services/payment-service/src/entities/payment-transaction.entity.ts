import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum PaymentProvider {
    STRIPE = 'stripe',
    IYZICO = 'iyzico',
    PAYTR = 'paytr',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SUCCESS = 'success',
    FAILED = 'failed',
    REFUNDED = 'refunded',
    CANCELLED = 'cancelled',
}

@Entity('payment_transactions')
export class PaymentTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hotelId: string;

    @Column({ nullable: true })
    reservationId: string;

    @Column({ nullable: true })
    folioId: string;

    @Column({
        type: 'enum',
        enum: PaymentProvider,
    })
    provider: PaymentProvider;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ length: 3, default: 'TRY' })
    currency: string;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;

    @Column({ nullable: true })
    providerTransactionId: string;

    @Column({ nullable: true })
    providerPaymentId: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata: any;

    @Column({ nullable: true })
    customerName: string;

    @Column({ nullable: true })
    customerEmail: string;

    @Column({ nullable: true })
    customerPhone: string;

    @Column({ type: 'text', nullable: true })
    errorMessage: string;

    @Column({ default: false })
    isRefunded: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    refundedAmount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
