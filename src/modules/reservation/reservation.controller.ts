import { Controller, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Reservation } from 'src/entities/reservation.entity';
import { ReservationLog } from 'src/entities/reservationLog.entity';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  private logger = new Logger(ReservationController.name);
  constructor(private readonly ReservationService: ReservationService) {}

  @Post('/:concertId')
  async createReservation(
    @Param() params: any,
    @Req() request: Request,
  ): Promise<Reservation> {
    return this.ReservationService.createReservation({
      user: (request.user as any).id,
      concert: params.concertId,
    });
  }

  @Post('/cancel/:reservationId')
  async cancelReservation(
    @Param() params: any,
    @Req() request: Request,
  ): Promise<Reservation> {
    console.log('test');
    return this.ReservationService.cancelReservation({
      user: (request.user as any).id,
      reservation: params.reservationId,
    });
  }

  @Get('/log')
  async getReservationLog(): Promise<ReservationLog[]> {
    return this.ReservationService.getAllReservationLog();
  }

  @Get()
  async getReserved(@Req() req: Request): Promise<Reservation[]> {
    return this.ReservationService.getAllReservedByUser((req.user as any).id);
  }
}
