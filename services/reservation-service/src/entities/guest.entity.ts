import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum GuestType {
    INDIVIDUAL = 'individual',
    CORPORATE = 'corporate',
    TRAVEL_AGENT = 'travel_agent',
}

@Entity('guests')
export class Guest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'hotel_id' })
    hotelId: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ unique: true, nullable: true })
    email?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    nationality?: string;

    @Column({ name: 'id_number', nullable: true })
    idNumber?: string;

    @Column({ name: 'passport_number', nullable: true })
    passportNumber?: string;

    @Column({ name: 'date_of_birth', type: 'date', nullable: true })
    dateOfBirth?: Date;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    city?: string;

    @Column({ nullable: true })
    country?: string;

    @Column({ name: 'postal_code', nullable: true })
    postalCode?: string;

    @Column({
        type: 'enum',
        enum: GuestType,
        default: GuestType.INDIVIDUAL,
    })
    type: GuestType;

    @Column({ name: 'company_name', nullable: true })
    companyName?: string;

    @Column({ name: 'tax_number', nullable: true })
    taxNumber?: string;

    @Column({ name: 'vip_status', default: false })
    vipStatus: boolean;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
