import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Reservation } from '../../entities/reservation.entity';
import { CreateReservationDto } from './reservation.dto';

@Injectable()
export class ReservationRepository extends Repository<Reservation> {
  constructor(private dataSource: DataSource) {
    super(Reservation, dataSource.createEntityManager());
  }

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const reservation = this.create({
      ...createReservationDto,
      user: { id: createReservationDto.user },
      concert: { id: createReservationDto.concert },
    });

    await this.save(reservation);
    return reservation;
  }

  async findReservedByUserId(userId: string): Promise<Reservation[]> {
    return this.find({ where: { userId } });
  }

  async findById(id: string): Promise<Reservation> {
    return this.findOneBy({ id });
  }

  async deleteById(id: string): Promise<void> {
    await this.softDelete(id);
  }
}
