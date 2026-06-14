import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}
const decodeJwt = (token: string): JwtPayload | null => {
  let decoded;
  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.log(error);
    decoded = null;
  }
  return decoded;
};

export { decodeJwt };
