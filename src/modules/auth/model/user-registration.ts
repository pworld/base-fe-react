export interface IUserRegistration {
  userAccountNumber: string;
  userPhone: string;
  userEmail: string;
  userPassword?: string;
}

export interface IAccountExternalActivation {
  token_code: string,
  password: string,
  password_confirmation: string,
}

export interface IAccountInternalActivation {
  password: string,
  token_code: string,
}

export interface IUserResetPassword {
  email: string,
  password: string,
  password_confirmation: string,
  phone_number: string,
}

export interface IAccountActivationTokenCheckerPayload {
  token_code: string;
}

export interface IAccountActivationTokenCheckerResponse {
  company_name: string;
  email: string;
  first_name: string;
  industry_name: string;
  is_token_available: string;
  last_name: string;
  phone_number: string;
  employee_number: string;
}
