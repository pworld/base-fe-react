import { useCreate } from '@refinedev/core';

import { IResetPasswordTokenChekerParams } from '../model/reset-password';

export const useResetPasswordService = () => {
  const { mutate, isLoading } = useCreate();

  async function resetPasswordTokenChecker(values: IResetPasswordTokenChekerParams): Promise<any> {
    return new Promise((resolve, reject) => {
      mutate({
        resource: 'auth/reset-password/token-checker',
        values,
        dataProviderName: 'oauth',
        meta: {
          headers: { 'app-id': 'tms' },
        },
      }, {
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      });
    });
  }

  return {
    resetPasswordTokenChecker,
    isLoading,
  };
};

export default useResetPasswordService;
