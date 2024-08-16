import { axiosWithToken } from '../helpers/axios';



export const fetchUserRole = async (userId: number) => {
  try {
    const role = await axiosWithToken(`/user-role/role/${userId}`, {}, 'GET');
    return role; 
  } catch (error: any) {
    console.error('Error fetching user role', error.response || error);
    throw new Error(error.response?.data?.message || 'Error fetching user role.');
  }
};
