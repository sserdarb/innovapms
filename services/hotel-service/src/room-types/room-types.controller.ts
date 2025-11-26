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
import { RoomTypesService } from './room-types.service';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from './dto/room-type.dto';

@ApiTags('Room Types')
@Controller('room-types')
@ApiBearerAuth()
export class RoomTypesController {
    constructor(private readonly roomTypesService: RoomTypesService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni oda tipi oluştur' })
    @ApiResponse({ status: 201, description: 'Oda tipi başarıyla oluşturuldu' })
    async create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
        const roomType = await this.roomTypesService.create(createRoomTypeDto);
        return { success: true, data: roomType };
    }

    @Get()
    @ApiOperation({ summary: 'Oda tiplerini listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiResponse({ status: 200, description: 'Oda tipi listesi' })
    async findAll(@Query('hotelId') hotelId: string) {
        const roomTypes = await this.roomTypesService.findAll(hotelId);
        return { success: true, data: roomTypes };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Oda tipi detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Oda tipi detayları' })
    async findOne(@Param('id') id: string) {
        const roomType = await this.roomTypesService.findOne(id);
        return { success: true, data: roomType };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Oda tipi bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Oda tipi başarıyla güncellendi' })
    async update(@Param('id') id: string, @Body() updateRoomTypeDto: UpdateRoomTypeDto) {
        const roomType = await this.roomTypesService.update(id, updateRoomTypeDto);
        return { success: true, data: roomType };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Oda tipini sil' })
    @ApiResponse({ status: 204, description: 'Oda tipi başarıyla silindi' })
    async remove(@Param('id') id: string) {
        await this.roomTypesService.remove(id);
    }
}
