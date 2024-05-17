import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('concert')
export class Concert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'int' })
  limit: number;

  @OneToMany(() => Reservation, (reservation) => reservation.concert, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  reservations?: Reservation[];

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
