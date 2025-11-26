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

@Entity('room_types')
export class RoomType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ name: 'max_adults', default: 2 })
    maxAdults: number;

    @Column({ name: 'max_children', default: 0 })
    maxChildren: number;

    @Column({ name: 'max_occupancy', default: 2 })
    maxOccupancy: number;

    @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
    basePrice?: number;

    @Column({ name: 'extra_bed_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
    extraBedPrice?: number;

    @Column({ type: 'jsonb', default: '[]' })
    amenities: string[];

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Hotel)
    @JoinColumn({ name: 'hotel_id' })
    hotel: Hotel;
}
