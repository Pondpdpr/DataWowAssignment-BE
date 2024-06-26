import {
  Column,
  DeleteDateColumn,
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

  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'varchar', name: 'concert_id' })
  concertId: string;

  @ManyToOne(() => Concert, (concert) => concert.reservations)
  @JoinColumn({ name: 'concert_id' })
  concert?: Concert;

  @OneToMany(
    () => ReservationLog,
    (reservationLog) => reservationLog.reservation,
  )
  reservationLogs?: ReservationLog[];

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
