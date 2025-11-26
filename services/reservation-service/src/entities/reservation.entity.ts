import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

export enum ReservationStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    CHECKED_IN = 'checked_in',
    CHECKED_OUT = 'checked_out',
    NO_SHOW = 'no_show',
}

export enum ReservationSource {
    DIRECT = 'direct',
    PHONE = 'phone',
    EMAIL = 'email',
    WEBSITE = 'website',
    OTA = 'ota',
    WALK_IN = 'walk_in',
    AGENT = 'agent',
}

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column({ name: 'reservation_number', unique: true })
    reservationNumber: string;

    @Column({ name: 'arrival_date', type: 'date' })
    arrivalDate: Date;

    @Column({ name: 'departure_date', type: 'date' })
    departureDate: Date;

    @Column({ type: 'int' })
    adults: number;

    @Column({ type: 'int', default: 0 })
    children: number;

    @Column({
        type: 'enum',
        enum: ReservationStatus,
        default: ReservationStatus.CONFIRMED,
    })
    status: ReservationStatus;

    @Column({
        type: 'enum',
        enum: ReservationSource,
        default: ReservationSource.DIRECT,
    })
    source: ReservationSource;

    @Column({ name: 'rate_code_id', nullable: true })
    rateCodeId?: string;

    @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalAmount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    balance: number;

    @Column({ name: 'special_requests', type: 'text', nullable: true })
    specialRequests?: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @Column({ name: 'checked_in_at', type: 'timestamp', nullable: true })
    checkedInAt?: Date;

    @Column({ name: 'checked_out_at', type: 'timestamp', nullable: true })
    checkedOutAt?: Date;

    @Column({ name: 'cancelled_at', type: 'timestamp', nullable: true })
    cancelledAt?: Date;

    @Column({ name: 'cancellation_reason', nullable: true })
    cancellationReason?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
