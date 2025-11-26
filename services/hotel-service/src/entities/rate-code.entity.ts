import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('rate_codes')
export class RateCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'is_public', default: true })
    isPublic: boolean;

    @Column({ name: 'min_los', type: 'int', default: 1 })
    minLos: number;

    @Column({ name: 'max_los', type: 'int', nullable: true })
    maxLos?: number;

    @Column({ name: 'min_advance_booking', type: 'int', default: 0 })
    minAdvanceBooking: number;

    @Column({ name: 'max_advance_booking', type: 'int', nullable: true })
    maxAdvanceBooking?: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
