import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Concert } from './concert.entity';
import { ReservationLog } from './reservationLog.entity';
import { User } from './user.entity';

@Entity('reservation')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.reservations)
  @JoinColumn({ name: 'concert_id' })
  concert: Concert;

  @OneToMany(
    () => ReservationLog,
    (reservationLog) => reservationLog.reservation,
  )
  reservationLogs: ReservationLog[];
}
