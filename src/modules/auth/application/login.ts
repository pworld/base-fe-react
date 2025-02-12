import { LoginPayload } from '../model/login';
import { useLoginService } from '../service/login';

export const useLoginApplication = () => {
  const {
    login,
    loginManual,
    ...restLoginService
  } = useLoginService();

  async function loginApp() {
    return login();
  }

  async function loginManualApp(payload: LoginPayload) {
    return loginManual(payload);
  }

  return {
    loginApp,
    loginManualApp,
    ...restLoginService,
  };
};

export default useLoginApplication;
