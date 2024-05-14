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
  id: string;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'int', name: 'reservation_id' })
  reservationId: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.reservationLogs)
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

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
