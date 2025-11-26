import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation } from '../entities/reservation.entity';
import { ReservationRoom } from '../entities/reservation-room.entity';
import { Guest } from '../entities/guest.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation, ReservationRoom, Guest])],
    controllers: [ReservationsController],
    providers: [ReservationsService],
    exports: [ReservationsService],
})
export class ReservationsModule { }
