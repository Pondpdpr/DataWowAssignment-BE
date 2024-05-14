import { Action } from 'src/entities/reservationLog.entity';

export class CreateReservationDto {
  user: string;

  concert: string;
}

export class CancelReservationDto {
  user: string;

  reservation: string;
}

export class CreateReservationLogDto {
  user: string;

  reservation: string;

  action: Action;
}
