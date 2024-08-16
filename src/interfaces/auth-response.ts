export interface AuthResponse {
  status?: boolean;
  message?: string;
  access_token?: string;
  token?: string;
  user: User;
}

export interface User {
  id?: number;
  username?: string;
  name?: string;
  lastName?: string;
  motherLastName?: string;
  fullName?: string;
  password?: string;
  isActive?: boolean;
  picture?: string;
  userRoles?: UserRole[];
  activeRole?: string;
  activeRoleId?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user?: User | null;
  token?: string | null;
  errorMessage: string | null;
  isLoading: boolean;
  isLoadingRole: boolean;
  typeUser: any;
}


export interface UserRole {
    id:       number;
    isActive: boolean;
    role:     Role;
}

export interface Role {
    id:   number;
    name: string;
}

