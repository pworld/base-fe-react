export interface LoginParams {
  providerName?: string;
  email?: string;
  password?: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_name: string;
}

export interface UpdatePasswordParams {
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordParams {
  email: string;
}