import { axiosWithToken } from '../../../../helpers/axios';


export const fetchPartialsData = async (idClass: number) => {
  try {
    const response = await axiosWithToken(`/partial/findAll?classId=${idClass}&page=1&limit=100`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching partials", error);
    return [];
  }
};

export const createAttendance = async (classId: number, partialId: number, attendanceDate: string, state: number) => {
  try {
    const response = await axiosWithToken(`/attendance/bulk-create`, {
      classId,
      partialId,
      day: new Date(attendanceDate),
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