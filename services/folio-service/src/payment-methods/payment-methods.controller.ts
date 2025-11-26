import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from './dto/payment-method.dto';
import { PaymentMethodType } from '../entities/payment-method.entity';

@ApiTags('Payment Methods')
@Controller('payment-methods')
@ApiBearerAuth()
export class PaymentMethodsController {
    constructor(private readonly paymentMethodsService: PaymentMethodsService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni ödeme yöntemi oluştur' })
    @ApiResponse({ status: 201, description: 'Ödeme yöntemi başarıyla oluşturuldu' })
    async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
        const paymentMethod = await this.paymentMethodsService.create(createPaymentMethodDto);
        return { success: true, data: paymentMethod };
    }

    @Get()
    @ApiOperation({ summary: 'Ödeme yöntemlerini listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'type', required: false, enum: PaymentMethodType })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Ödeme yöntemi listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('type') type?: PaymentMethodType,
        @Query('isActive') isActive?: boolean,
    ) {
        const paymentMethods = await this.paymentMethodsService.findAll(hotelId, type, isActive);
        return { success: true, data: paymentMethods };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Ödeme yöntemi detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Ödeme yöntemi detayları' })
    async findOne(@Param('id') id: string) {
        const paymentMethod = await this.paymentMethodsService.findOne(id);
        return { success: true, data: paymentMethod };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Ödeme yöntemi bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Ödeme yöntemi başarıyla güncellendi' })
    async update(
        @Param('id') id: string,
        @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
    ) {
        const paymentMethod = await this.paymentMethodsService.update(id, updatePaymentMethodDto);
        return { success: true, data: paymentMethod };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Ödeme yöntemini sil' })
    @ApiResponse({ status: 200, description: 'Ödeme yöntemi başarıyla silindi' })
    async remove(@Param('id') id: string) {
        await this.paymentMethodsService.remove(id);
        return { success: true, message: 'Ödeme yöntemi başarıyla silindi' };
    }
}
