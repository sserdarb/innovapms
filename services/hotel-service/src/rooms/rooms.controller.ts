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
import { RoomsService } from './rooms.service';
import { CreateRoomDto, UpdateRoomDto, UpdateRoomStatusDto } from './dto/room.dto';
import { RoomStatus } from '../entities/room.entity';

@ApiTags('Rooms')
@Controller('rooms')
@ApiBearerAuth()
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni oda oluştur' })
    @ApiResponse({ status: 201, description: 'Oda başarıyla oluşturuldu' })
    async create(@Body() createRoomDto: CreateRoomDto) {
        const room = await this.roomsService.create(createRoomDto);
        return { success: true, data: room };
    }

    @Get()
    @ApiOperation({ summary: 'Odaları listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'status', required: false, enum: RoomStatus })
    @ApiResponse({ status: 200, description: 'Oda listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('status') status?: RoomStatus,
    ) {
        const rooms = await this.roomsService.findAll(hotelId, status);
        return { success: true, data: rooms };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Oda detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Oda detayları' })
    async findOne(@Param('id') id: string) {
        const room = await this.roomsService.findOne(id);
        return { success: true, data: room };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Oda bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Oda başarıyla güncellendi' })
    async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
        const room = await this.roomsService.update(id, updateRoomDto);
        return { success: true, data: room };
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Oda durumunu güncelle' })
    @ApiResponse({ status: 200, description: 'Oda durumu başarıyla güncellendi' })
    async updateStatus(
        @Param('id') id: string,
        @Body() updateStatusDto: UpdateRoomStatusDto,
    ) {
        const room = await this.roomsService.updateStatus(id, updateStatusDto);
        return { success: true, data: room };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Odayı sil' })
    @ApiResponse({ status: 204, description: 'Oda başarıyla silindi' })
    async remove(@Param('id') id: string) {
        await this.roomsService.remove(id);
    }
}
