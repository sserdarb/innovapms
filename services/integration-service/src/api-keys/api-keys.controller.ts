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
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto, UpdateApiKeyDto } from './dto/api-key.dto';

@ApiTags('API Keys')
@Controller('api-keys')
@ApiBearerAuth()
export class ApiKeysController {
    constructor(private readonly apiKeysService: ApiKeysService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni API key oluştur' })
    @ApiResponse({ status: 201, description: 'API key başarıyla oluşturuldu' })
    async create(@Body() createApiKeyDto: CreateApiKeyDto) {
        const apiKey = await this.apiKeysService.create(createApiKeyDto);
        return { success: true, data: apiKey };
    }

    @Get()
    @ApiOperation({ summary: 'API key\'leri listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'API key listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('isActive') isActive?: boolean,
    ) {
        const apiKeys = await this.apiKeysService.findAll(hotelId, isActive);
        return { success: true, data: apiKeys };
    }

    @Get(':id')
    @ApiOperation({ summary: 'API key detaylarını getir' })
    @ApiResponse({ status: 200, description: 'API key detayları' })
    async findOne(@Param('id') id: string) {
        const apiKey = await this.apiKeysService.findOne(id);
        return { success: true, data: apiKey };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'API key bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'API key başarıyla güncellendi' })
    async update(
        @Param('id') id: string,
        @Body() updateApiKeyDto: UpdateApiKeyDto,
    ) {
        const apiKey = await this.apiKeysService.update(id, updateApiKeyDto);
        return { success: true, data: apiKey };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'API key\'i sil' })
    @ApiResponse({ status: 200, description: 'API key başarıyla silindi' })
    async remove(@Param('id') id: string) {
        await this.apiKeysService.remove(id);
        return { success: true, message: 'API key başarıyla silindi' };
    }
}
