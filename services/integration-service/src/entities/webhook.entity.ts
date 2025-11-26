import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('webhooks')
export class Webhook {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column()
    name: string;

    @Column()
    url: string;

    @Column({ type: 'jsonb', default: '[]' })
    events: string[];

    @Column({ nullable: true })
    secret?: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'retry_count', default: 3 })
    retryCount: number;

    @Column({ name: 'timeout_seconds', default: 30 })
    timeoutSeconds: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
