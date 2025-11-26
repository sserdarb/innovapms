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
import { RateCodesService } from './rate-codes.service';
import { CreateRateCodeDto, UpdateRateCodeDto } from './dto/rate-code.dto';

@ApiTags('Rate Codes')
@Controller('rate-codes')
@ApiBearerAuth()
export class RateCodesController {
    constructor(private readonly rateCodesService: RateCodesService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni fiyat kodu oluştur' })
    @ApiResponse({ status: 201, description: 'Fiyat kodu başarıyla oluşturuldu' })
    async create(@Body() createRateCodeDto: CreateRateCodeDto) {
        const rateCode = await this.rateCodesService.create(createRateCodeDto);
        return { success: true, data: rateCode };
    }

    @Get()
    @ApiOperation({ summary: 'Fiyat kodlarını listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'isActive', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Fiyat kodu listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('isActive') isActive?: boolean,
    ) {
        const rateCodes = await this.rateCodesService.findAll(hotelId, isActive);
        return { success: true, data: rateCodes };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Fiyat kodu detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Fiyat kodu detayları' })
    async findOne(@Param('id') id: string) {
        const rateCode = await this.rateCodesService.findOne(id);
        return { success: true, data: rateCode };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Fiyat kodu bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Fiyat kodu başarıyla güncellendi' })
    async update(
        @Param('id') id: string,
        @Body() updateRateCodeDto: UpdateRateCodeDto,
    ) {
        const rateCode = await this.rateCodesService.update(id, updateRateCodeDto);
        return { success: true, data: rateCode };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Fiyat kodunu sil' })
    @ApiResponse({ status: 200, description: 'Fiyat kodu başarıyla silindi' })
    async remove(@Param('id') id: string) {
        await this.rateCodesService.remove(id);
        return { success: true, message: 'Fiyat kodu başarıyla silindi' };
    }
}
