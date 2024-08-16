import { User } from "./auth-response";

export interface Tutor {
    id: number;
    user: User;
    isActive: boolean;
  }