export class LoginDto {
  email: string;

  password: string;
}

export type AccessToken = {
  access_token: string;
};
export type AccessTokenPayload = {
  email: string;
};
