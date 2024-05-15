export class CreateConcertDto {
  name: string;

  description?: string;

  limit: number;
}
export class StatDto {
  seats: number;

  reserved: number;

  canceled: number;
}
