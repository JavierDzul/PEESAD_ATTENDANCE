import { useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setTypeUser } from '../../store/auth/authSlice';
import { fetchUserRole } from '../../api/auth-Providers';

const api = ({
    baseURL: import.meta.env.VITE_SOCKET_SERVER 
});

export const useRoleChangeListener = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const socket = io(api.baseURL, {
        withCredentials: true,
      });

      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      socket.on('roleChange', async (data) => {
        console.log('Role change detected:', data);
        try {
          const newRoleResponse = await fetchUserRole(data.userId);
          const { role } = newRoleResponse; 
          if (role) {
            console.log('New role fetched:', role);
            dispatch(setTypeUser(role));
          } else {
            console.error('Role data is missing');
          }
        } catch (error) {
          console.error('Error fetching new role:', error);
        }
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });

      socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
      });

      return () => {
        socket.off('roleChange');
        socket.disconnect();
      };
    }, [dispatch]);
};
