import { Controller, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Reservation } from 'src/entities/reservation.entity';
import { ReservationLog } from 'src/entities/reservationLog.entity';
import { ReserveService } from './reservation.service';

@Controller('reserve')
export class ReserveController {
  private logger = new Logger(ReserveController.name);
  constructor(private readonly reserveService: ReserveService) {}

  @Post('/:concertId')
  async createReservation(
    @Param() params: any,
    @Req() request: Request,
  ): Promise<Reservation> {
    return this.reserveService.createReservation({
      user: (request.user as any).id,
      concert: params.concertId,
    });
  }

  @Post('/cancel/:reservationId')
  async cancelReservation(
    @Param() params: any,
    @Req() request: Request,
  ): Promise<Reservation> {
    return this.reserveService.cancelReservation({
      user: (request.user as any).id,
      reservation: params.reservationId,
    });
  }

  @Get('/log')
  async getReservationLog(
    @Param() params: any,
    @Req() request: Request,
  ): Promise<ReservationLog[]> {
    return this.reserveService.getAllReservationLog();
  }
}
