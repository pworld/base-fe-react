import { IResetPasswordTokenChekerParams } from '../model/reset-password';
import { useResetPasswordService } from '../service/reset-password';

export const useResetPassword = () => {
  const {
    resetPasswordTokenChecker: resetPasswordTokenCheckerService,
    isLoading,
  } = useResetPasswordService();

  async function resetPasswordTokenChecker(formData: IResetPasswordTokenChekerParams) {
    const response = await resetPasswordTokenCheckerService(formData);
    return response;
  }

  return {
    resetPasswordTokenChecker,
    isLoading,
  };
};

export default useResetPassword;
