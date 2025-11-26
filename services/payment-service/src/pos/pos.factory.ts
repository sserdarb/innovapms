import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POSConfiguration, BankPOSProvider } from '../entities/pos-configuration.entity';
import { IPOSProvider } from '../interfaces/pos-provider.interface';

// Import all POS providers
import { StripeProvider } from '../providers/stripe.provider';
import { IyzicoProvider } from '../providers/iyzico.provider';
import { PayTRProvider } from '../providers/paytr.provider';
import { GarantiPOSProvider } from '../providers/banks/garanti-pos.provider';
import { IsBankPOSProvider } from '../providers/banks/isbank-pos.provider';
// ... other bank providers

@Injectable()
export class POSFactory {
    constructor(
        @InjectRepository(POSConfiguration)
        private posConfigRepository: Repository<POSConfiguration>,
    ) { }

    async createProvider(
        hotelId: string,
        provider?: BankPOSProvider
    ): Promise<IPOSProvider> {
        let config: POSConfiguration | null;

        if (provider) {
            // Get specific provider
            config = await this.posConfigRepository.findOne({
                where: { hotelId, provider, isActive: true },
            });
        } else {
            // Get default provider
            config = await this.posConfigRepository.findOne({
                where: { hotelId, isActive: true, isDefault: true },
                order: { priority: 'DESC' },
            });
        }

        if (!config) {
            throw new Error('No active POS configuration found');
        }

        return this.instantiateProvider(config);
    }

    private instantiateProvider(config: POSConfiguration): IPOSProvider {
        switch (config.provider) {
            case BankPOSProvider.STRIPE:
                return new StripeProvider();

            case BankPOSProvider.IYZICO:
                return new IyzicoProvider();

            case BankPOSProvider.PAYTR:
                return new PayTRProvider();

            case BankPOSProvider.GARANTI_PAY:
                return new GarantiPOSProvider(config.credentials, config.isTestMode);

            case BankPOSProvider.ISBANK_POS:
                return new IsBankPOSProvider(config.credentials, config.isTestMode);

            // Add other banks here...
            // case BankPOSProvider.AKBANK_POS:
            //   return new AkbankPOSProvider(config.credentials, config.isTestMode);

            default:
                throw new Error(`Unsupported POS provider: ${config.provider}`);
        }
    }

    async getAllProviders(hotelId: string): Promise<POSConfiguration[]> {
        return await this.posConfigRepository.find({
            where: { hotelId },
            order: { priority: 'DESC', createdAt: 'DESC' },
        });
    }

    async getActiveProviders(hotelId: string): Promise<POSConfiguration[]> {
        return await this.posConfigRepository.find({
            where: { hotelId, isActive: true },
            order: { priority: 'DESC' },
        });
    }
}
