import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ name: 'display_name' })
    displayName: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    module: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
