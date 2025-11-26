import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { HotelsService } from './hotels.service';
import { CreateHotelDto, UpdateHotelDto } from './dto/hotel.dto';

@ApiTags('Hotels')
@Controller('hotels')
@ApiBearerAuth()
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni otel oluştur' })
    @ApiResponse({ status: 201, description: 'Otel başarıyla oluşturuldu' })
    @ApiResponse({ status: 409, description: 'Otel kodu zaten kullanımda' })
    async create(@Body() createHotelDto: CreateHotelDto) {
        const hotel = await this.hotelsService.create(createHotelDto);
        return {
            success: true,
            data: hotel,
        };
    }

    @Get()
    @ApiOperation({ summary: 'Tüm otelleri listele' })
    @ApiResponse({ status: 200, description: 'Otel listesi' })
    async findAll() {
        const hotels = await this.hotelsService.findAll();
        return {
            success: true,
            data: hotels,
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Otel detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Otel detayları' })
    @ApiResponse({ status: 404, description: 'Otel bulunamadı' })
    async findOne(@Param('id') id: string) {
        const hotel = await this.hotelsService.findOne(id);
        return {
            success: true,
            data: hotel,
        };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Otel bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Otel başarıyla güncellendi' })
    @ApiResponse({ status: 404, description: 'Otel bulunamadı' })
    async update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
        const hotel = await this.hotelsService.update(id, updateHotelDto);
        return {
            success: true,
            data: hotel,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Oteli sil' })
    @ApiResponse({ status: 204, description: 'Otel başarıyla silindi' })
    @ApiResponse({ status: 404, description: 'Otel bulunamadı' })
    async remove(@Param('id') id: string) {
        await this.hotelsService.remove(id);
    }

    @Get('health')
    @ApiOperation({ summary: 'Servis sağlık kontrolü' })
    @ApiResponse({ status: 200, description: 'Servis çalışıyor' })
    health() {
        return {
            status: 'ok',
            service: 'hotel-service',
            timestamp: new Date().toISOString(),
        };
    }
}
