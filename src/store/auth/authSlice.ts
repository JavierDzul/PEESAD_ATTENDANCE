import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, AuthState } from "../../interfaces/auth-response";

const token = localStorage.getItem('token');
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
const typeUser = localStorage.getItem('TypeUser');

const initialState: AuthState = {
    isAuthenticated: !!token,
    user: user,
    token: token,
    errorMessage: null,
    isLoading: false,
    isLoadingRole: false,
    typeUser: typeUser
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<AuthResponse>) => {
            if (action.payload.access_token) {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                state.errorMessage = null;
                localStorage.setItem('token', action.payload.access_token);
                if (action.payload.user) {
                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                }
            }
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.errorMessage = action.payload;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('TypeUser');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.errorMessage = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('TypeUser');
            localStorage.removeItem('teacherId');

        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setIsLoadingRole: (state, action: PayloadAction<boolean>) => {
            state.isLoadingRole = action.payload;
        },
        setTypeUser: (state, action: PayloadAction<string | null>) => {
            state.typeUser = action.payload;
            if (action.payload !== null) {
                localStorage.setItem('TypeUser', action.payload);
            } else {
                localStorage.removeItem('TypeUser');
            }
        }
    }
})

export const { loginSuccess, loginFailure, logout, setIsLoading, setIsLoadingRole, setTypeUser } = authSlice.actions;

export default authSlice.reducer;
