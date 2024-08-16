import axios from 'axios';

const accessToken = localStorage.getItem('token') || '';

axios.interceptors.request.use(
  config => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const fetchPartialsData = async (idClass: number) => {
  try {
    const response = await axios.get(`http://localhost:5100/api/partial/findAll`, {
      params: {
        classId: idClass,
        page: 1,
        limit: 100
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching partials", error);
    return [];
  }
};

export const createAttendance = async (classId: number, partialId: number, attendanceDate: string, state: number) => {
  try {
    const response = await axios.post("http://localhost:5100/api/attendance/bulk-create", {
      classId,
      partialId,
      day: new Date(attendanceDate),
      state,
    });
    return response.data;
  } catch (error:any) {
    throw new Error(error);
  }
};

export const createPartial = async (classId: number, title: string) => {
  try {
    const response = await axios.post("http://localhost:5100/api/partial/create", {
      title,
      classId,
    });
    return response.data;
  } catch (error:any) {
    throw new Error(error);
  }
};
