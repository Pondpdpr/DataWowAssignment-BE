import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ReservationLog } from '../../entities/reservationLog.entity';
import { CreateReservationLogDto } from './reservation.dto';

@Injectable()
export class ReservationLogRepository extends Repository<ReservationLog> {
  constructor(private dataSource: DataSource) {
    super(ReservationLog, dataSource.createEntityManager());
  }

  async createReservationLog(
    createReservationLogDto: CreateReservationLogDto,
  ): Promise<ReservationLog> {
    const reservationLog = this.create({
      ...createReservationLogDto,
      user: { id: createReservationLogDto.user },
      reservation: { id: createReservationLogDto.reservation },
    });

    await this.save(reservationLog);
    return reservationLog;
  }

  async findAll(): Promise<ReservationLog[]> {
    const result = this.createQueryBuilder('rl')
      .withDeleted()
      .leftJoin('rl.reservation', 'r')
      .leftJoin('r.user', 'u')
      .leftJoin('r.concert', 'c')
      .select([
        'rl.id as id',
        'rl.action as action',
        'rl.created_at as created_at',
        'u.name as userName',
        'c.name as concertName',
      ])
      .getRawMany();
    return result;
  }

  async findUserAll(userId: string): Promise<ReservationLog[]> {
    const result = this.createQueryBuilder('rl')
      .withDeleted()
      .leftJoin('rl.reservation', 'r')
      .leftJoin('r.user', 'u')
      .leftJoin('r.concert', 'c')
      .select([
        'rl.id as id',
        'rl.action as action',
        'rl.created_at as created_at',
        'u.name as userName',
        'c.name as concertName',
      ])
      .where('rl.userId = :user', { user: userId })
      .getRawMany();
    return result;
  }
}
