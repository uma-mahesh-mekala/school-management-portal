import { createContext } from "react";
import type { AuthContextType } from "../types/types";

const AuthContext = createContext<AuthContextType | null>(null);

export { AuthContext };
