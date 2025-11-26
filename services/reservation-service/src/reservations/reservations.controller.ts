import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import {
    CreateReservationDto,
    UpdateReservationDto,
    CancelReservationDto,
    CheckInDto,
} from './dto/reservation.dto';
import { ReservationStatus } from '../entities/reservation.entity';

@ApiTags('Reservations')
@Controller('reservations')
@ApiBearerAuth()
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @Post()
    @ApiOperation({ summary: 'Yeni rezervasyon oluştur' })
    @ApiResponse({ status: 201, description: 'Rezervasyon başarıyla oluşturuldu' })
    async create(@Body() createReservationDto: CreateReservationDto) {
        const reservation = await this.reservationsService.create(createReservationDto);
        return { success: true, data: reservation };
    }

    @Get()
    @ApiOperation({ summary: 'Rezervasyonları listele' })
    @ApiQuery({ name: 'hotelId', required: true })
    @ApiQuery({ name: 'status', required: false, enum: ReservationStatus })
    @ApiQuery({ name: 'arrivalDate', required: false })
    @ApiQuery({ name: 'departureDate', required: false })
    @ApiResponse({ status: 200, description: 'Rezervasyon listesi' })
    async findAll(
        @Query('hotelId') hotelId: string,
        @Query('status') status?: ReservationStatus,
        @Query('arrivalDate') arrivalDate?: string,
        @Query('departureDate') departureDate?: string,
    ) {
        const reservations = await this.reservationsService.findAll(
            hotelId,
            status,
            arrivalDate ? new Date(arrivalDate) : undefined,
            departureDate ? new Date(departureDate) : undefined,
        );
        return { success: true, data: reservations };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Rezervasyon detaylarını getir' })
    @ApiResponse({ status: 200, description: 'Rezervasyon detayları' })
    async findOne(@Param('id') id: string) {
        const reservation = await this.reservationsService.findOne(id);
        return { success: true, data: reservation };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Rezervasyon bilgilerini güncelle' })
    @ApiResponse({ status: 200, description: 'Rezervasyon başarıyla güncellendi' })
    async update(
        @Param('id') id: string,
        @Body() updateReservationDto: UpdateReservationDto,
    ) {
        const reservation = await this.reservationsService.update(id, updateReservationDto);
        return { success: true, data: reservation };
    }

    @Post(':id/cancel')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Rezervasyonu iptal et' })
    @ApiResponse({ status: 200, description: 'Rezervasyon başarıyla iptal edildi' })
    async cancel(@Param('id') id: string, @Body() cancelDto: CancelReservationDto) {
        const reservation = await this.reservationsService.cancel(id, cancelDto);
        return { success: true, data: reservation };
    }

    @Post(':id/check-in')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Check-in işlemi yap' })
    @ApiResponse({ status: 200, description: 'Check-in başarıyla yapıldı' })
    async checkIn(@Param('id') id: string, @Body() checkInDto: CheckInDto) {
        const reservation = await this.reservationsService.checkIn(id, checkInDto);
        return { success: true, data: reservation };
    }

    @Post(':id/check-out')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Check-out işlemi yap' })
    @ApiResponse({ status: 200, description: 'Check-out başarıyla yapıldı' })
    async checkOut(@Param('id') id: string) {
        const reservation = await this.reservationsService.checkOut(id);
        return { success: true, data: reservation };
    }

    @Get('health')
    @ApiOperation({ summary: 'Servis sağlık kontrolü' })
    @ApiResponse({ status: 200, description: 'Servis çalışıyor' })
    health() {
        return {
            status: 'ok',
            service: 'reservation-service',
            timestamp: new Date().toISOString(),
        };
    }
}
