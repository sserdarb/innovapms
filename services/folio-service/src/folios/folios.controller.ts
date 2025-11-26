import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { FoliosService } from './folios.service';
import {
    CreateFolioDto,
    AddChargeDto,
    AddPaymentDto,
    TransferFolioDto,
} from './dto/folio.dto';
import { FolioStatus } from '../entities/folio.entity';

@ApiTags('Folios')
@Controller('folios')
@ApiBearerAuth()
export class FoliosController {
    constructor(private readonly foliosService: FoliosService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni folyo oluştur' })
    @ApiResponse({ status: 201, description: 'Folyo başarıyla oluşturuldu' })
    async create(@Body() createFolioDto: CreateFolioDto) {
        const folio = await this.foliosService.create(createFolioDto);
        return { success: true, data: folio };
    }

    @Get()
    @ApiOperation({ summary: 'Folyoları listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'status', required: false, enum: FolioStatus })
    @ApiResponse({ status: 200, description: 'Folyo listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('status') status?: FolioStatus,
    ) {
        const folios = await this.foliosService.findAll(hotelId, status);
        return { success: true, data: folios };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Folyo detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Folyo detayları' })
    async findOne(@Param('id') id: string) {
        const folio = await this.foliosService.findOne(id);
        return { success: true, data: folio };
    }

    @Get(':id/transactions')
    @ApiOperation({ summary: 'Folyo işlemlerini getir' })
    @ApiResponse({ status: 200, description: 'İşlem listesi' })
    async getTransactions(@Param('id') id: string) {
        const transactions = await this.foliosService.getTransactions(id);
        return { success: true, data: transactions };
    }

    @Post(':id/charges')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Folyoya işlem ekle' })
    @ApiResponse({ status: 200, description: 'İşlem başarıyla eklendi' })
    async addCharge(@Param('id') id: string, @Body() chargeDto: AddChargeDto) {
        const transaction = await this.foliosService.addCharge(id, chargeDto);
        return { success: true, data: transaction };
    }

    @Post(':id/payments')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Ödeme al' })
    @ApiResponse({ status: 200, description: 'Ödeme başarıyla alındı' })
    async addPayment(@Param('id') id: string, @Body() paymentDto: AddPaymentDto) {
        const transaction = await this.foliosService.addPayment(id, paymentDto);
        return { success: true, data: transaction };
    }

    @Post(':id/transfer')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Folyo transfer işlemi' })
    @ApiResponse({ status: 200, description: 'Transfer başarıyla yapıldı' })
    async transfer(@Param('id') id: string, @Body() transferDto: TransferFolioDto) {
        await this.foliosService.transfer(id, transferDto);
        return { success: true, message: 'Transfer başarıyla yapıldı' };
    }

    @Post(':id/close')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Folyoyu kapat' })
    @ApiResponse({ status: 200, description: 'Folyo başarıyla kapatıldı' })
    async close(@Param('id') id: string) {
        const folio = await this.foliosService.close(id);
        return { success: true, data: folio };
    }

    @Get('health')
    @ApiOperation({ summary: 'Servis sağlık kontrolü' })
    @ApiResponse({ status: 200, description: 'Servis çalışıyor' })
    health() {
        return {
            status: 'ok',
            service: 'folio-service',
            timestamp: new Date().toISOString(),
        };
    }
}
