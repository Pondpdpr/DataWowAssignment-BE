import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;
}
