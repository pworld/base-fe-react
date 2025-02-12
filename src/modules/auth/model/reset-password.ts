export interface IResetPasswordParams {
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  token_code: string;
}

export interface IResetPasswordTokenChekerParams {
  token_code: string;
}
