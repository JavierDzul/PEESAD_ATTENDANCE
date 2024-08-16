import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth/authSlice';

interface IdleTimerProviderProps {
    children: React.ReactNode;
    timeout: number; 
}

export const IdleTimerProvider: React.FC<IdleTimerProviderProps> = ({ children, timeout }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    const resetTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(handleLogout, timeout);
    };

    useEffect(() => {
        const events = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        const eventHandler = () => resetTimer();

        events.forEach(event => window.addEventListener(event, eventHandler));

        resetTimer();

        return () => {
            events.forEach(event => window.removeEventListener(event, eventHandler));
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [timeout]);

    return <>{children}</>;
};
