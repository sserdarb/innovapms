import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum BankPOSProvider {
    // Payment Gateways
    STRIPE = 'stripe',
    IYZICO = 'iyzico',
    PAYTR = 'paytr',
    PAYU = 'payu',

    // Turkish Banks
    GARANTI_PAY = 'garanti_pay',
    ISBANK_POS = 'isbank_pos',
    AKBANK_POS = 'akbank_pos',
    YKB_POS = 'ykb_pos',
    ZIRAAT_POS = 'ziraat_pos',
    HALKBANK_POS = 'halkbank_pos',
    VAKIFBANK_POS = 'vakifbank_pos',
    DENIZBANK_POS = 'denizbank_pos',
    FINANSBANK_POS = 'finansbank_pos',
    TEB_POS = 'teb_pos',
    ING_POS = 'ing_pos',
    KUVEYT_TURK_POS = 'kuveyt_turk_pos',
    ALBARAKA_POS = 'albaraka_pos',
}

@Entity('pos_configurations')
export class POSConfiguration {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hotelId: string;

    @Column({
        type: 'enum',
        enum: BankPOSProvider,
    })
    provider: BankPOSProvider;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isDefault: boolean;

    @Column({ default: false })
    isTestMode: boolean;

    // Encrypted credentials
    @Column({ type: 'jsonb' })
    credentials: {
        merchantId?: string;
        terminalId?: string;
        apiKey?: string;
        secretKey?: string;
        storeKey?: string;
        userName?: string;
        password?: string;
        clientId?: string;
        [key: string]: any;
    };

    @Column({ type: 'jsonb', nullable: true })
    settings: {
        currency?: string;
        language?: string;
        successUrl?: string;
        failUrl?: string;
        callbackUrl?: string;
        enable3D?: boolean;
        enableInstallment?: boolean;
        maxInstallment?: number;
        [key: string]: any;
    };

    @Column({ type: 'int', default: 0 })
    priority: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
