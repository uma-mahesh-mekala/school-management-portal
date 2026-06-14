import type { LoginRequest, LoginResponse } from "../types/types";
import authStorage from "../utils/authStorage";
const authUrl = `${import.meta.env.VITE_BACKEND_URL}/auth`;

const login = async (
  loginCredentials: LoginRequest,
): Promise<LoginResponse> => {
  const loginUrl = `${authUrl}/login`;

  try {
    const loginResponse = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginCredentials),
      mode: "cors",
    });

    const responseData = await loginResponse.json();

    if (!loginResponse.ok) {
      return {
        isError: true,
        errorMessage: responseData.message,
      };
    }

    return {
      isError: false,
      accessToken: responseData.accessToken,
    };
  } catch (error) {
    console.log(error);
    return {
      isError: true,
      errorMessage: "Could not connect to server",
    };
  }
};

const validateToken = async () => {
  const accessToken = authStorage.getAccessToken();

  if (!accessToken) {
    return false;
  }

  try {
    const validateTokenUrl = `${authUrl}/validate`;
    const validateTokenResponse = await fetch(validateTokenUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      mode: "cors",
    });

    return validateTokenResponse.ok;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { login, validateToken };
