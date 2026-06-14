import LoginForm from "../components/LoginForm";
import type { LoginRequest } from "../types/types";
import { login } from "../services/authService";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

export default function LoginPage() {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (loginRequest: LoginRequest) => {
    const result = await login(loginRequest);

    if (result.isError) {
      setErrorMessage(result.errorMessage);
      return;
    }

    auth.login(result.accessToken);
    navigate("/");
  };
  return <LoginForm onSubmit={handleSubmit} errorMessage={errorMessage} />;
}
