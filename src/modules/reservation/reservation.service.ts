import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Reservation } from 'src/entities/reservation.entity';
import { Action, ReservationLog } from 'src/entities/reservationLog.entity';
import { CancelReservationDto, CreateReservationDto } from './reservation.dto';
import { ReservationRepository } from './reservation.repostory';
import { ReservationLogRepository } from './reserveLog.repository';

@Injectable()
export class ReserveService {
  private logger = new Logger(ReserveService.name);

  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly reservationLogRepository: ReservationLogRepository,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    try {
      const reservation =
        await this.reservationRepository.createReservation(
          createReservationDto,
        );
      await this.reservationLogRepository.createReservationLog({
        user: createReservationDto.user,
        reservation: reservation.id,
        action: Action.RESERVE,
      });

      return reservation;
    } catch (error) {
      this.logger.log(
        `ConcertService:createConcert: ${JSON.stringify(error.message)}`,
      );
    }
  }

  async cancelReservation(
    cancelReservationDto: CancelReservationDto,
  ): Promise<Reservation> {
    try {
      const reservation = await this.reservationRepository.findById(
        cancelReservationDto.reservation,
      );
      await this.reservationRepository.deleteById(reservation.id);
      await this.reservationLogRepository.createReservationLog({
        user: cancelReservationDto.user,
        reservation: reservation.id,
        action: Action.CANCEL,
      });

      return reservation;
    } catch (error) {
      this.logger.log(
        `BottleService:deleteBottle: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }

  async getAllReservationLog(): Promise<ReservationLog[]> {
    try {
      const reservationLogs = await this.reservationLogRepository.findAll();

      return reservationLogs;
    } catch (error) {
      this.logger.log(
        `BottleService:deleteBottle: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }
}
