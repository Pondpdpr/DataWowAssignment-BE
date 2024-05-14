import { UserRole } from 'src/entities/user.entity';

export class CreateUserDto {
  name: string;

  password: string;

  email: string;

  role?: UserRole;
}

export class CredentialDto {
  email: string;

  password: string;
}
