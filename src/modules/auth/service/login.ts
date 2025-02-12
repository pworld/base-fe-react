import { useLogin } from '@refinedev/core';

import Cookies from 'js-cookie';

import { KEYCLOACK_CLIENT_ID, KEYCLOACK_REALM, KEYCLOACK_URL } from '@/config/env';
import { generateCodeChallenge, generateCodeVerifier, generateUUID } from '@/utility/helper/pkce';

import { LoginPayload } from '../model/login';

export const useLoginService = () => {
  const { mutate, isLoading: loadingLogin } = useLogin();

  async function loginManual(values: LoginPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      mutate({ ...values, isLoginManual: true }, {
        onSuccess: (response) => resolve(response),
        onError: (error) => reject(error),
      });
    });
  }

  async function login(): Promise<any> {
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = generateCodeChallenge(codeVerifier);
      const state = generateUUID();

      const redirectURI = `${window.location.origin}/auth/callback`;

      Cookies.set('code_challenge', codeChallenge);
      Cookies.set('code_verifier', codeVerifier);
      Cookies.set('state', state);

      const searchParams = new URLSearchParams({
        client_id: KEYCLOACK_CLIENT_ID,
        grant_type: 'authorization_code',
        response_type: 'code',
        redirect_uri: redirectURI,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        scope: 'openid',
        state,
      });

      Cookies.set('prevLoc', redirectURI);
      const redirectUrl = `${KEYCLOACK_URL}/realms/${KEYCLOACK_REALM}/protocol/openid-connect/auth?${searchParams.toString()}`;
      window.location.replace(redirectUrl);

      return await Promise.resolve();
    } catch (error) {
      return {
        success: false,
        error: { message: `${error}`, name: 'LoginError' },
      };
    }
  }

  return {
    login,
    loginManual,
    loadingLogin,
  };
};

export default useLoginService;
