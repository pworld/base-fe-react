import { useCreate, useCustomMutation } from '@refinedev/core';

import { API_AUTH_URL } from '@/config/env';
import { useApi } from '@/hooks/useApi';

import {
  IAccountActivationTokenCheckerPayload,
  IAccountExternalActivation,
  IAccountInternalActivation,
  IUserResetPassword,
} from '../model/user-registration';

const RESOURCE = 'user-registration';

export const useUserRegistrationService = () => {
  const { mutate: customMutate } = useCustomMutation();
  const { sendCustomURLBasicRequest } = useApi();
  const { mutate: post, isLoading: loadingPost } = useCreate();

  async function getRegisteredPendingUser(id: string) {
    // return await sendBasicRequest(
    //   `/mock-${RESOURCE}-get-user`,
    //   "GET",
    // )

    console.warn('FUNCTION RETURN MOCK DATA');

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          userAccountNumber: '12345',
          userPhone: '0888231723721',
          userEmail: 'johndoe@gmail.com',
        });
      }, 3000);
    });
  }

  /**
   *
   * @param payload
   * @returns
   */

  async function registerUser(payload: IAccountExternalActivation) {
    return sendCustomURLBasicRequest(
      `${API_AUTH_URL}/api/tms/v1/auth/employee/account-activation`,
      'POST',
      payload,
    );
  }

  /**
   *
   * @param payload
   * @returns
   */
  async function resetPassword(payload: IUserResetPassword) {
    return sendCustomURLBasicRequest(
      // `${API_AUTH_URL}/api/tms/v1/auth/employee/reset-password`,
      `${API_AUTH_URL}/api/tms/v1/auth/change-password`,
      'POST',
      payload,
    );
  }

  async function externalEmployeeAccountActivation(
    values: IAccountExternalActivation,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      post({
        resource: 'auth/external-employee/account-activation',
        values,
        dataProviderName: 'oauth',
      }, {
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      });
    });
  }

  async function internalEmployeeAccountActivation(
    values: IAccountInternalActivation,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      post({
        resource: 'auth/internal-employee/account-activation',
        values,
        dataProviderName: 'oauth',
      }, {
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      });
    });
  }

  async function activationTokenChecker(
    values: IAccountActivationTokenCheckerPayload,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      post({
        resource: 'auth/employee/account-activation/token-checker',
        values,
        dataProviderName: 'oauth',
      }, {
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      });
    });
  }

  return {
    getRegisteredPendingUser,
    registerUser,
    resetPassword,
    externalEmployeeAccountActivation,
    internalEmployeeAccountActivation,
    activationTokenChecker,
    loadingPost,
  };
};

export default useUserRegistrationService;
