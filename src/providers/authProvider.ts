import { API_BASE_URL } from '@/config/env';
import axios from "axios";
import { ForgotPasswordParams, LoginParams, RegisterParams, UpdatePasswordParams } from '@/model/apps/auth';
import { axiosInstance } from '@/utility';

export interface CurrentUser {
  user_id: string;
  user_name: string;
  email: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
}

export const authProvider = {
  login: async ({ providerName, email, password }: LoginParams) => {

    try {
      const response = await axiosInstance.post('auth/login', { email, password });
      const loginData = response.data.data;

      if (response.status == 200 && loginData?.access_token) {
        const currentUser: CurrentUser = {
          user_id: loginData.user_id,
          user_name: loginData.user_name,
          email: loginData.email,
          tenant_id: loginData.tenant_id,
          first_name: loginData.first_name,
          last_name: loginData.last_name,
        };

        const authToken: AuthToken = {
          access_token: loginData.access_token,
          refresh_token: loginData.refresh_token,
        };

        // SetItem Storage
        localStorage.setItem('_currentUser', JSON.stringify(currentUser));
        localStorage.setItem('_authToken', JSON.stringify(authToken));
        localStorage.setItem('_permissions', JSON.stringify(loginData.permissions));

        return {
          success: true,
          redirectTo: '/',
        };
      } else {
        return {
          success: false,
          error: { message: 'Login failed', name: 'InvalidCredentials' },
        };
      }
    } catch (error) {
      return {
        success: false,
        error: { message: `${error}`, name: 'LoginError' },
      };
    }
  },
  register: async ({ email, password, first_name, company_name, last_name }: RegisterParams) => {
    const { data, status } = await axiosInstance.post('/register', { email, password, first_name, last_name, company_name });
    if (status === 200 && data?.data) {
      return {
        success: true,
        redirectTo: '/',
      };
    }

    return {
      success: false,
      error: {
        message: 'Register failed',
        name: data?.error || 'There is an error, please contact our customer support',
      },
    };
  },
  updatePassword: async ({ oldPassword, newPassword }: UpdatePasswordParams) => {
    return {
      success: false,
      error: {
        message: 'Update password failed',
        name: 'Invalid password',
      },
    };
  },
  forgotPassword: async ({ email }: ForgotPasswordParams) => {
    return {
      success: false,
      error: {
        message: 'Forgot password failed',
        name: 'Invalid email',
      },
    };
  },
  logout: async () => {
    localStorage.removeItem('_currentUser');
    localStorage.removeItem('_authToken');
    localStorage.removeItem('_permissions');

    return {
      success: true,
      redirectTo: '/login',
    };
  },
  onError: async (error: { response: { status: number; }; }) => {
    // if (error.response?.status === 401) {
    //   return {
    //     logout: true,
    //   };
    // }

    // Construct an Error object with a message that includes the status code
    const errorMessage = `HTTP Error: ${error}`;
    return {
      error: new Error(errorMessage)
    };
  },

  check: async () =>
    localStorage.getItem('_currentUser')
      ? {
        authenticated: true,
      }
      : {
        authenticated: false,
        error: {
          message: 'Check failed',
          name: 'Not authenticated',
        },
        logout: true,
        redirectTo: '/login',
      },
  getPermissions: async () => {
    // Can be consumed from all places
    const _permissions = localStorage.getItem('_permissions');
    const permissions = _permissions ? JSON.parse(_permissions) : '';
    return permissions;
  },
  getIdentity: async (): Promise<any> => {
    const currentUser = localStorage.getItem('_currentUser');
    if (currentUser) {
      const { user_id, first_name, last_name, email } = JSON.parse(currentUser);
      return {
        id: user_id,
        name: `${first_name} ${last_name}`,
        avatar: 'https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640'
      };
    }
    return { id: '', name: '', avatar: '' };
  },
  refreshToken: async (refreshToken: string): Promise<string> => {
    try {
      const response = await axios.post('auth/refresh-token', { token: refreshToken }, {
        baseURL: API_BASE_URL
      });

      const { data, status } = response;
      const responseData = data?.data || {};

      if (status === 200) {
        const token: AuthToken = {
          access_token: responseData.access_token,
          refresh_token: responseData.refresh_token,
        };
        localStorage.setItem('_authToken', JSON.stringify(token));

        return token.access_token;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      throw new Error('Error exchanging code for tokens');
    }
  }
};