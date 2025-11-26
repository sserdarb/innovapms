import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';

@ApiTags('Webhooks')
@Controller('webhooks')
@ApiBearerAuth()
export class WebhooksController {
    constructor(private readonly webhooksService: WebhooksService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni webhook oluştur' })
    @ApiResponse({ status: 201, description: 'Webhook başarıyla oluşturuldu' })
    async create(@Body() createWebhookDto: CreateWebhookDto) {
        const webhook = await this.webhooksService.create(createWebhookDto);
        return { success: true, data: webhook };
    }

    @Get()
    @ApiOperation({ summary: 'Webhook\'leri listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Webhook listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('isActive') isActive?: boolean,
    ) {
        const webhooks = await this.webhooksService.findAll(hotelId, isActive);
        return { success: true, data: webhooks };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Webhook detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Webhook detayları' })
    async findOne(@Param('id') id: string) {
        const webhook = await this.webhooksService.findOne(id);
        return { success: true, data: webhook };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Webhook bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Webhook başarıyla güncellendi' })
    async update(
        @Param('id') id: string,
        @Body() updateWebhookDto: UpdateWebhookDto,
    ) {
        const webhook = await this.webhooksService.update(id, updateWebhookDto);
        return { success: true, data: webhook };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Webhook\'i sil' })
    @ApiResponse({ status: 200, description: 'Webhook başarıyla silindi' })
    async remove(@Param('id') id: string) {
        await this.webhooksService.remove(id);
        return { success: true, message: 'Webhook başarıyla silindi' };
    }

    @Post('trigger')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Webhook tetikle (test için)' })
    @ApiResponse({ status: 200, description: 'Webhook tetiklendi' })
    async trigger(
        @Body() body: { hotelId: string; event: string; payload: any },
    ) {
        await this.webhooksService.trigger(body.hotelId, body.event, body.payload);
        return { success: true, message: 'Webhook tetiklendi' };
    }
}
