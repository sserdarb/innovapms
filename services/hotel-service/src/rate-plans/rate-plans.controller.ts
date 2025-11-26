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
import { RatePlansService } from './rate-plans.service';
import { CreateRatePlanDto, UpdateRatePlanDto } from './dto/rate-plan.dto';

@ApiTags('Rate Plans')
@Controller('rate-plans')
@ApiBearerAuth()
export class RatePlansController {
    constructor(private readonly ratePlansService: RatePlansService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni fiyat planı oluştur' })
    @ApiResponse({ status: 201, description: 'Fiyat planı başarıyla oluşturuldu' })
    async create(@Body() createRatePlanDto: CreateRatePlanDto) {
        const ratePlan = await this.ratePlansService.create(createRatePlanDto);
        return { success: true, data: ratePlan };
    }

    @Get()
    @ApiOperation({ summary: 'Fiyat planlarını listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'rateCodeId', required: false })
    @ApiQuery({ name: 'roomTypeId', required: false })
    @ApiQuery({ name: 'startDate', required: false })
    @ApiQuery({ name: 'endDate', required: false })
    @ApiResponse({ status: 200, description: 'Fiyat planı listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('rateCodeId') rateCodeId?: string,
        @Query('roomTypeId') roomTypeId?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        const ratePlans = await this.ratePlansService.findAll(
            hotelId,
            rateCodeId,
            roomTypeId,
            startDate ? new Date(startDate) : undefined,
            endDate ? new Date(endDate) : undefined,
        );
        return { success: true, data: ratePlans };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Fiyat planı detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Fiyat planı detayları' })
    async findOne(@Param('id') id: string) {
        const ratePlan = await this.ratePlansService.findOne(id);
        return { success: true, data: ratePlan };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Fiyat planı bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Fiyat planı başarıyla güncellendi' })
    async update(
        @Param('id') id: string,
        @Body() updateRatePlanDto: UpdateRatePlanDto,
    ) {
        const ratePlan = await this.ratePlansService.update(id, updateRatePlanDto);
        return { success: true, data: ratePlan };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Fiyat planını sil' })
    @ApiResponse({ status: 200, description: 'Fiyat planı başarıyla silindi' })
    async remove(@Param('id') id: string) {
        await this.ratePlansService.remove(id);
        return { success: true, message: 'Fiyat planı başarıyla silindi' };
    }
}
