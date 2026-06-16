export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthContextType {
  email: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  role: string;
}

export interface LoginSuccessResponse {
  isError: false;
  accessToken: string;
}

export interface LoginFailureResponse {
  isError: true;
  errorMessage: string;
}

export type LoginResponse = LoginSuccessResponse | LoginFailureResponse;

export interface LoginFormProps {
  onSubmit: (loginRequest: LoginRequest) => Promise<void>;
  errorMessage: string | null;
}
