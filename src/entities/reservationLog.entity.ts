import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { User } from './user.entity';

export enum Action {
  RESERVE = 'Reserve',
  CANCEL = 'Cancel',
}

@Entity('reservation_log')
export class ReservationLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'varchar', name: 'reservation_id' })
  reservationId: string;

  @ManyToOne(() => Reservation, (reservation) => reservation.reservationLogs)
  @JoinColumn({ name: 'reservation_id' })
  reservation?: Reservation;

  @Column({
    type: 'enum',
    enum: Action,
  })
  action: Action;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
