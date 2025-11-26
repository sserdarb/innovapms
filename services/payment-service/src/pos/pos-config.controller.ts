import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POSConfiguration, BankPOSProvider } from '../entities/pos-configuration.entity';

@ApiTags('POS Management')
@Controller('pos-config')
export class POSConfigController {
    constructor(
        @InjectRepository(POSConfiguration)
        private posConfigRepository: Repository<POSConfiguration>,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Tüm POS yapılandırmalarını listele' })
    async getAllConfigs(@Query('hotelId') hotelId: string) {
        return await this.posConfigRepository.find({
            where: { hotelId },
            order: { priority: 'DESC', createdAt: 'DESC' },
        });
    }

    @Get('active')
    @ApiOperation({ summary: 'Aktif POS yapılandırmalarını listele' })
    async getActiveConfigs(@Query('hotelId') hotelId: string) {
        return await this.posConfigRepository.find({
            where: { hotelId, isActive: true },
            order: { priority: 'DESC' },
        });
    }

    @Get('providers')
    @ApiOperation({ summary: 'Desteklenen POS sağlayıcılarını listele' })
    getAvailableProviders() {
        return {
            paymentGateways: [
                { value: BankPOSProvider.STRIPE, label: 'Stripe', logo: 'stripe.png' },
                { value: BankPOSProvider.IYZICO, label: 'iyzico', logo: 'iyzico.png' },
                { value: BankPOSProvider.PAYTR, label: 'PayTR', logo: 'paytr.png' },
                { value: BankPOSProvider.PAYU, label: 'PayU', logo: 'payu.png' },
            ],
            turkishBanks: [
                { value: BankPOSProvider.GARANTI_PAY, label: 'Garanti BBVA', logo: 'garanti.png' },
                { value: BankPOSProvider.ISBANK_POS, label: 'İş Bankası', logo: 'isbank.png' },
                { value: BankPOSProvider.AKBANK_POS, label: 'Akbank', logo: 'akbank.png' },
                { value: BankPOSProvider.YKB_POS, label: 'Yapı Kredi', logo: 'ykb.png' },
                { value: BankPOSProvider.ZIRAAT_POS, label: 'Ziraat Bankası', logo: 'ziraat.png' },
                { value: BankPOSProvider.HALKBANK_POS, label: 'Halkbank', logo: 'halkbank.png' },
                { value: BankPOSProvider.VAKIFBANK_POS, label: 'VakıfBank', logo: 'vakifbank.png' },
                { value: BankPOSProvider.DENIZBANK_POS, label: 'DenizBank', logo: 'denizbank.png' },
                { value: BankPOSProvider.FINANSBANK_POS, label: 'QNB Finansbank', logo: 'finansbank.png' },
                { value: BankPOSProvider.TEB_POS, label: 'TEB', logo: 'teb.png' },
                { value: BankPOSProvider.ING_POS, label: 'ING Bank', logo: 'ing.png' },
                { value: BankPOSProvider.KUVEYT_TURK_POS, label: 'Kuveyt Türk', logo: 'kuveytturk.png' },
                { value: BankPOSProvider.ALBARAKA_POS, label: 'Albaraka Türk', logo: 'albaraka.png' },
            ],
        };
    }

    @Post()
    @ApiOperation({ summary: 'Yeni POS yapılandırması ekle' })
    async createConfig(@Body() data: Partial<POSConfiguration>) {
        const config = this.posConfigRepository.create(data);
        return await this.posConfigRepository.save(config);
    }

    @Put(':id')
    @ApiOperation({ summary: 'POS yapılandırmasını güncelle' })
    async updateConfig(@Param('id') id: string, @Body() data: Partial<POSConfiguration>) {
        await this.posConfigRepository.update(id, data);
        return await this.posConfigRepository.findOne({ where: { id } });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'POS yapılandırmasını sil' })
    async deleteConfig(@Param('id') id: string) {
        await this.posConfigRepository.delete(id);
        return { success: true };
    }

    @Post(':id/activate')
    @ApiOperation({ summary: 'POS yapılandırmasını aktif et' })
    async activateConfig(@Param('id') id: string) {
        await this.posConfigRepository.update(id, { isActive: true });
        return { success: true };
    }

    @Post(':id/deactivate')
    @ApiOperation({ summary: 'POS yapılandırmasını pasif et' })
    async deactivateConfig(@Param('id') id: string) {
        await this.posConfigRepository.update(id, { isActive: false });
        return { success: true };
    }

    @Post(':id/set-default')
    @ApiOperation({ summary: 'Varsayılan POS olarak ayarla' })
    async setAsDefault(@Param('id') id: string, @Query('hotelId') hotelId: string) {
        // Remove default from all others
        await this.posConfigRepository.update(
            { hotelId },
            { isDefault: false }
        );

        // Set this as default
        await this.posConfigRepository.update(id, { isDefault: true });
        return { success: true };
    }
}
