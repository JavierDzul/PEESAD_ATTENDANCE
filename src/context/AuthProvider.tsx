import { FC, useEffect, useState } from "react";
import { AuthContext } from './AuthContext';
import logo from "../assets/icons/logoAtten.png";
import { useRenewTokenMutation } from "../services/api/authApi";

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
    const [renewToken] = useRenewTokenMutation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await renewToken().unwrap();
                    if (response && response.access_token) {
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error("Error al verificar la autenticación:", error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, [renewToken]);

    if (loading) {
        return (

            <div className='d-flex flex-column align-items-center justify-content-center'>
                <div className="d-flex justify-content-center mt-5">
                    <img src={logo} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
                </div>
                <div className="text-center p-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
