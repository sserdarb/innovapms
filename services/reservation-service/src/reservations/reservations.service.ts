import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Reservation, ReservationStatus } from '../entities/reservation.entity';
import { ReservationRoom } from '../entities/reservation-room.entity';
import { Guest } from '../entities/guest.entity';
import {
    CreateReservationDto,
    UpdateReservationDto,
    CancelReservationDto,
    CheckInDto,
} from './dto/reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        @InjectRepository(ReservationRoom)
        private reservationRoomRepository: Repository<ReservationRoom>,
        @InjectRepository(Guest)
        private guestRepository: Repository<Guest>,
    ) { }

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        // Validate dates
        if (createReservationDto.arrivalDate >= createReservationDto.departureDate) {
            throw new BadRequestException('Çıkış tarihi giriş tarihinden sonra olmalıdır');
        }

        // Generate reservation number
        const reservationNumber = await this.generateReservationNumber(
            createReservationDto.hotelId,
        );

        // Create reservation
        const reservation = this.reservationRepository.create({
            ...createReservationDto,
            reservationNumber,
            status: ReservationStatus.CONFIRMED,
        });

        const savedReservation = await this.reservationRepository.save(reservation);

        // Create reservation rooms
        for (const room of createReservationDto.rooms) {
            const reservationRoom = this.reservationRoomRepository.create({
                reservationId: savedReservation.id,
                ...room,
            });
            await this.reservationRoomRepository.save(reservationRoom);
        }

        // Create or link guests
        for (const guestInfo of createReservationDto.guests) {
            let guest: Guest;

            // Try to find existing guest by email
            if (guestInfo.email) {
                guest = await this.guestRepository.findOne({
                    where: { email: guestInfo.email, hotelId: createReservationDto.hotelId },
                });
            }

            // Create new guest if not found
            if (!guest) {
                guest = this.guestRepository.create({
                    hotelId: createReservationDto.hotelId,
                    ...guestInfo,
                });
                await this.guestRepository.save(guest);
            }

            // Link guest to reservation (via reservation_guests table)
            // This would be handled by a separate entity in production
        }

        return this.findOne(savedReservation.id);
    }

    async findAll(
        hotelId: string,
        status?: ReservationStatus,
        arrivalDate?: Date,
        departureDate?: Date,
    ): Promise<Reservation[]> {
        const where: any = { hotelId };

        if (status) {
            where.status = status;
        }

        if (arrivalDate && departureDate) {
            where.arrivalDate = Between(arrivalDate, departureDate);
        } else if (arrivalDate) {
            where.arrivalDate = MoreThanOrEqual(arrivalDate);
        } else if (departureDate) {
            where.arrivalDate = LessThanOrEqual(departureDate);
        }

        return this.reservationRepository.find({
            where,
            order: { arrivalDate: 'ASC', createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Reservation> {
        const reservation = await this.reservationRepository.findOne({
            where: { id },
        });

        if (!reservation) {
            throw new NotFoundException('Rezervasyon bulunamadı');
        }

        return reservation;
    }

    async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
        const reservation = await this.findOne(id);

        if (reservation.status !== ReservationStatus.CONFIRMED) {
            throw new BadRequestException('Sadece onaylanmış rezervasyonlar güncellenebilir');
        }

        if (updateReservationDto.arrivalDate && updateReservationDto.departureDate) {
            if (updateReservationDto.arrivalDate >= updateReservationDto.departureDate) {
                throw new BadRequestException('Çıkış tarihi giriş tarihinden sonra olmalıdır');
            }
        }

        Object.assign(reservation, updateReservationDto);
        return this.reservationRepository.save(reservation);
    }

    async cancel(id: string, cancelDto: CancelReservationDto): Promise<Reservation> {
        const reservation = await this.findOne(id);

        if (reservation.status === ReservationStatus.CANCELLED) {
            throw new BadRequestException('Rezervasyon zaten iptal edilmiş');
        }

        if (reservation.status === ReservationStatus.CHECKED_OUT) {
            throw new BadRequestException('Check-out yapılmış rezervasyon iptal edilemez');
        }

        reservation.status = ReservationStatus.CANCELLED;
        reservation.cancelledAt = new Date();
        reservation.cancellationReason = cancelDto.reason;

        return this.reservationRepository.save(reservation);
    }

    async checkIn(id: string, checkInDto: CheckInDto): Promise<Reservation> {
        const reservation = await this.findOne(id);

        if (reservation.status !== ReservationStatus.CONFIRMED) {
            throw new BadRequestException('Sadece onaylanmış rezervasyonlar için check-in yapılabilir');
        }

        // Assign rooms
        for (const assignment of checkInDto.roomAssignments) {
            await this.reservationRoomRepository.update(
                { id: assignment.reservationRoomId },
                { roomId: assignment.roomId },
            );
        }

        reservation.status = ReservationStatus.CHECKED_IN;
        reservation.checkedInAt = new Date();

        return this.reservationRepository.save(reservation);
    }

    async checkOut(id: string): Promise<Reservation> {
        const reservation = await this.findOne(id);

        if (reservation.status !== ReservationStatus.CHECKED_IN) {
            throw new BadRequestException('Sadece check-in yapılmış rezervasyonlar için check-out yapılabilir');
        }

        reservation.status = ReservationStatus.CHECKED_OUT;
        reservation.checkedOutAt = new Date();

        return this.reservationRepository.save(reservation);
    }

    private async generateReservationNumber(hotelId: string): Promise<string> {
        const year = new Date().getFullYear();
        const count = await this.reservationRepository.count({
            where: { hotelId },
        });

        return `RES-${year}-${String(count + 1).padStart(5, '0')}`;
    }
}
