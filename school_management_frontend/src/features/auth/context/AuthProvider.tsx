import React, { useState } from "react";
import authStorage from "../utils/authStorage";
import { AuthContext } from "./AuthContext";
import { decodeJwt } from "../utils/decodeJwt";
import { isTokenExpired } from "../utils/validateToken";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState(authStorage.getAccessToken());

  const login = (token: string): void => {
    authStorage.setAccessToken(token);
    setAccessToken(token);
  };

  const logout = (): void => {
    authStorage.clearAccessToken();
    setAccessToken(null);
  };

  const decoded = accessToken ? decodeJwt(accessToken) : null;

  const email = decoded?.email ?? null;
  const isExpired = decoded ? isTokenExpired(decoded.exp) : true;
  const isAuthenticated = !!accessToken && !!decoded && !isExpired;
  const role = decoded?.role ?? null;

  if (accessToken && isExpired) {
    authStorage.clearAccessToken();
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        email,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
