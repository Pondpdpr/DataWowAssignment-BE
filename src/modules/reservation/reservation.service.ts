import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reservation } from 'src/entities/reservation.entity';
import { Action, ReservationLog } from 'src/entities/reservationLog.entity';
import { CancelReservationDto, CreateReservationDto } from './reservation.dto';
import { ReservationRepository } from './reservation.repostory';
import { ReservationLogRepository } from './reservationLog.repository';

@Injectable()
export class ReservationService {
  private logger = new Logger(ReservationService.name);

  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly reservationLogRepository: ReservationLogRepository,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    try {
      const existingReservation = await this.reservationRepository.findOneBy({
        userId: createReservationDto.user,
        concertId: createReservationDto.concert,
      });

      if (existingReservation) {
        throw new HttpException(
          'Reservation already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

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
        `ReservationService:createReservation: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }

  async cancelReservation(
    cancelReservationDto: CancelReservationDto,
  ): Promise<Reservation> {
    try {
      const reservation = await this.reservationRepository.findById(
        cancelReservationDto.reservation,
      );
      if (!cancelReservationDto.reservation || !reservation) {
        throw new HttpException(
          'Reservation not exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.reservationRepository.deleteById(reservation.id);
      await this.reservationLogRepository.createReservationLog({
        user: cancelReservationDto.user,
        reservation: reservation.id,
        action: Action.CANCEL,
      });

      return reservation;
    } catch (error) {
      this.logger.log(
        `ReservationService:cancelReservation: ${JSON.stringify(error.message)}`,
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
        `ReservationService:getAllReservationLog: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }

  async getUserReservationLog(userId: string): Promise<ReservationLog[]> {
    try {
      const reservationLogs =
        await this.reservationLogRepository.findUserAll(userId);

      return reservationLogs;
    } catch (error) {
      this.logger.log(
        `ReservationService:getAllReservationLog: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }

  async getAllReservedByUser(userId: string): Promise<Reservation[]> {
    try {
      const reservations =
        await this.reservationRepository.findReservedByUserId(userId);

      return reservations;
    } catch (error) {
      this.logger.log(
        `ReservationService:getAllReservedBtUser: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }
}
