import { decodeJwt } from "../utils/decodeJwt";

const validateToken = (token: string) => {
  const decoded = decodeJwt(token);

  if (!decoded) return false;
  return !isTokenExpired(decoded.exp);
};

const isTokenExpired = (expiration: number): boolean =>
  expiration * 1000 < Date.now();

export { validateToken, isTokenExpired };
