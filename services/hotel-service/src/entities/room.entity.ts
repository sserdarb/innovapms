import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { RoomType } from './room-type.entity';

export enum RoomStatus {
    CLEAN = 'clean',
    DIRTY = 'dirty',
    MAINTENANCE = 'maintenance',
    OUT_OF_ORDER = 'out_of_order',
}

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column({ name: 'room_type_id' })
    roomTypeId: string;

    @Column({ name: 'room_number' })
    roomNumber: string;

    @Column({ nullable: true })
    floor?: number;

    @Column({
        type: 'enum',
        enum: RoomStatus,
        default: RoomStatus.CLEAN,
    })
    status: RoomStatus;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ nullable: true })
    notes?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Hotel)
    @JoinColumn({ name: 'hotel_id' })
    hotel: Hotel;

    @ManyToOne(() => RoomType, { eager: true })
    @JoinColumn({ name: 'room_type_id' })
    roomType: RoomType;
}
