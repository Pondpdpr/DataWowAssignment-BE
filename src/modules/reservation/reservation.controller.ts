import { Controller, Get, Logger, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { Reservation } from 'src/entities/reservation.entity';
import { ReservationLog } from 'src/entities/reservationLog.entity';
import { UserRole } from 'src/entities/user.entity';
import { Roles } from '../auth/role.decorator';
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

  @Put('/cancel/:reservationId')
  async cancelReservation(
    @Param() params: any,
    @Req() request: Request,
  ): Promise<Reservation> {
    return this.ReservationService.cancelReservation({
      user: (request.user as any).id,
      reservation: params.reservationId,
    });
  }

  @Get('/log')
  async getReservationLog(@Req() request: Request): Promise<ReservationLog[]> {
    return this.ReservationService.getUserReservationLog(
      (request.user as any).id,
    );
  }

  @Get('/log/admin')
  @Roles(UserRole.ADMIN)
  async getAdminReservationLog(): Promise<ReservationLog[]> {
    return this.ReservationService.getAllReservationLog();
  }

  @Get()
  async getReserved(@Req() req: Request): Promise<Reservation[]> {
    return this.ReservationService.getAllReservedByUser((req.user as any).id);
  }
}
