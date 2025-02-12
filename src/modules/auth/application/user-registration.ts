import {
  IAccountActivationTokenCheckerPayload,
  IAccountExternalActivation,
  IAccountInternalActivation,
  IUserResetPassword,
} from '../model/user-registration';
import { useUserRegistrationService } from '../service/user-registration';

export const useUserRegistrationApplication = () => {
  const resource = 'user-registration';
  const {
    getRegisteredPendingUser,
    registerUser,
    resetPassword,
    externalEmployeeAccountActivation,
    internalEmployeeAccountActivation,
    activationTokenChecker,
    ...restUserRegiterService
  } = useUserRegistrationService();

  async function handleGetPendingUser(id: string) {
    try {
      const user = await getRegisteredPendingUser(id);

      return user;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async function handleRegisterUser(data: IAccountExternalActivation) {
    return registerUser(data);
  }

  const handleResetPassword = (data: IUserResetPassword) => resetPassword(data);

  async function externalActivateAccount(formData: IAccountExternalActivation) {
    const response = await externalEmployeeAccountActivation(formData);
    return response;
  }

  async function internalActivateAccount(formData: IAccountInternalActivation) {
    const response = await internalEmployeeAccountActivation(formData);
    return response;
  }

  async function activationAccountTokenChecker(formData: IAccountActivationTokenCheckerPayload) {
    const response = await activationTokenChecker(formData);
    return response;
  }

  return {
    resource,
    handleGetPendingUser,
    handleRegisterUser,
    resetPassword: handleResetPassword,
    externalActivateAccount,
    internalActivateAccount,
    activationAccountTokenChecker,
    ...restUserRegiterService,
  };
};

export default useUserRegistrationApplication;
