export interface ILoginPayload {
  account_identity_number_or_password: string;
  password: string;
}

export interface ILoginForm {
  accountIdentityNumberOrPhone: string;
  password: string;
}

export type LoginPayload = {
  username: string;
  password: string;
};
