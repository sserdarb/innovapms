import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('reservation_rooms')
export class ReservationRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'reservation_id' })
    reservationId: string;

    @Column({ name: 'room_type_id' })
    roomTypeId: string;

    @Column({ name: 'room_id', nullable: true })
    roomId?: string;

    @Column({ type: 'int' })
    adults: number;

    @Column({ type: 'int', default: 0 })
    children: number;

    @Column({ name: 'rate_amount', type: 'decimal', precision: 10, scale: 2 })
    rateAmount: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => Reservation)
    @JoinColumn({ name: 'reservation_id' })
    reservation: Reservation;
}
