import { instance } from "../api.ts";
import { AuthResponse, User } from "../../types/rawTypes.ts";

export const authApi = {
  login: (email: string, password: string): Promise<AuthResponse> => {
    return instance.post("/auth/login", { email, password });
  },
  register: (email: string, password: string): Promise<AuthResponse> => {
    return instance.post("/auth/register", { email, password });
  },
  signInWithGoogle: (googleToken: string): Promise<AuthResponse> => {
    return instance.post("/auth/signInWithGoogle", { googleToken });
  },
  getUser: (): Promise<User> => {
    return instance.get("/auth/profile");
  },
};
