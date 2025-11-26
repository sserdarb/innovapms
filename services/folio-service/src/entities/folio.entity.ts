import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

export enum FolioStatus {
    OPEN = 'open',
    CLOSED = 'closed',
    TRANSFERRED = 'transferred',
}

@Entity('folios')
export class Folio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column({ name: 'folio_number', unique: true })
    folioNumber: string;

    @Column({ name: 'reservation_id', nullable: true })
    reservationId?: string;

    @Column({ name: 'guest_id', nullable: true })
    guestId?: string;

    @Column({
        type: 'enum',
        enum: FolioStatus,
        default: FolioStatus.OPEN,
    })
    status: FolioStatus;

    @Column({ name: 'total_charges', type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalCharges: number;

    @Column({ name: 'total_payments', type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalPayments: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

    @Column({ name: 'currency_code', default: 'TRY' })
    currencyCode: string;

    @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
    closedAt?: Date;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
