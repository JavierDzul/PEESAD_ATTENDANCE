import { useState, useEffect } from 'react';
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const useAttendance = (idClass: number) => {
  const [partials, setPartials] = useState<any[]>([]);
  const [selectedPartial, setSelectedPartial] = useState<any | null>(null);

  const fetchPartials = async () => {
    try {
      const response = await axios.get(`https://academico.peesadqroo.com/api/partial/findAll`, {
        params: {
          classId: idClass,
          page: 1,
          limit: 100
        }
      });
      setPartials(response.data.data);
      if (response.data.data.length > 0) {
        setSelectedPartial(response.data.data[response.data.data.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching partials", error);
    }
  };

  useEffect(() => {
    fetchPartials();
  }, [idClass]);

  return { partials, selectedPartial, setSelectedPartial, fetchPartials };
};
