import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('external_api_keys')
export class ApiKey {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ name: 'api_key', unique: true })
    apiKey: string;

    @Column({ type: 'jsonb', default: '[]' })
    permissions: string[];

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'last_used_at', type: 'timestamp', nullable: true })
    lastUsedAt?: Date;

    @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
    expiresAt?: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
