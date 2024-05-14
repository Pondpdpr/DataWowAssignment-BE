import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { ReservationLog } from 'src/entities/reservationLog.entity';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repostory';
import { ReservationService } from './reservation.service';
import { ReservationLogRepository } from './reservationLog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservationLog])],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    ReservationRepository,
    ReservationLogRepository,
  ],
})
export class ReservationModule {}
