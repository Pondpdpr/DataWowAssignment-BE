import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('concert')
export class Concert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  limit: number;

  @Column({ type: 'int', default: 0 })
  reserved: number;

  @OneToMany(() => Reservation, (reservation) => reservation.concert)
  reservations: Reservation[];
}
