import { axiosWithToken } from '../../../../helpers/axios';


export const fetchPartialsData = async (idClass: number) => {
  try {
    const response = await axiosWithToken(`/partial/findAll?classId=${idClass}&page=1&limit=100`);
    const partialsData = response.data;
    if (Array.isArray(partialsData)) {
      return partialsData;
    } else {
      console.error("Expected an array for partials data but received:", partialsData);
      return [];
    }
  } catch (error) {
    console.error("Error fetching partials", error);
    return [];
  }
};


export const createAttendance = async (classId: number, partialId: number, state: number) => {
  try {
    const response = await axiosWithToken(`/attendance/bulk-create`, {
      classId,
      partialId,
      state,
    }, 'POST');
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const createPartial = async (classId: number, title: string) => {
  try {
    const response = await axiosWithToken(`/partial/create`, {
      title,
      classId,
    }, 'POST');
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};