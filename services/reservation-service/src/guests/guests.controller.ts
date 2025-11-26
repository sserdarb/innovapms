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
import { GuestsService } from './guests.service';
import { CreateGuestDto, UpdateGuestDto } from './dto/guest.dto';
import { GuestType } from '../entities/guest.entity';

@ApiTags('Guests')
@Controller('guests')
@ApiBearerAuth()
export class GuestsController {
    constructor(private readonly guestsService: GuestsService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni misafir oluştur' })
    @ApiResponse({ status: 201, description: 'Misafir başarıyla oluşturuldu' })
    async create(@Body() createGuestDto: CreateGuestDto) {
        const guest = await this.guestsService.create(createGuestDto);
        return { success: true, data: guest };
    }

    @Get()
    @ApiOperation({ summary: 'Misafirleri listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'type', required: false, enum: GuestType })
    @ApiQuery({ name: 'vipStatus', required: false, type: Boolean })
    @ApiResponse({ status: 200, description: 'Misafir listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('search') search?: string,
        @Query('type') type?: GuestType,
        @Query('vipStatus') vipStatus?: boolean,
    ) {
        const guests = await this.guestsService.findAll(hotelId, search, type, vipStatus);
        return { success: true, data: guests };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Misafir detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Misafir detayları' })
    async findOne(@Param('id') id: string) {
        const guest = await this.guestsService.findOne(id);
        return { success: true, data: guest };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Misafir bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Misafir başarıyla güncellendi' })
    async update(
        @Param('id') id: string,
        @Body() updateGuestDto: UpdateGuestDto,
    ) {
        const guest = await this.guestsService.update(id, updateGuestDto);
        return { success: true, data: guest };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Misafiri sil' })
    @ApiResponse({ status: 200, description: 'Misafir başarıyla silindi' })
    async remove(@Param('id') id: string) {
        await this.guestsService.remove(id);
        return { success: true, message: 'Misafir başarıyla silindi' };
    }
}
