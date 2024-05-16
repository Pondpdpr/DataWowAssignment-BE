import { UserRole } from 'src/entities/user.entity';

export class LoginDto {
  email: string;

  password: string;
}

export type AccessToken = {
  user: {
    email: string;

    role: UserRole;
  };

  access_token: string;
};
export type AccessTokenPayload = {
  email: string;
};
