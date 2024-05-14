import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/reservation.entity';
import { ReservationLog } from 'src/entities/reservationLog.entity';
import { ReserveController } from './reservation.controller';
import { ReservationRepository } from './reservation.repostory';
import { ReserveService } from './reservation.service';
import { ReservationLogRepository } from './reserveLog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservationLog])],
  controllers: [ReserveController],
  providers: [ReserveService, ReservationRepository, ReservationLogRepository],
})
export class ReserveModule {}
