const ACCESS_TOEKN_KEY = "accessToken";

const authStorage = {
  getAccessToken: (): string | null => localStorage.getItem(ACCESS_TOEKN_KEY),

  setAccessToken: (token: string): void =>
    localStorage.setItem(ACCESS_TOEKN_KEY, token),

  clearAccessToken: (): void => localStorage.removeItem(ACCESS_TOEKN_KEY),
};

export default authStorage;
