import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAttendance = (idClass: number) => {
  const [partials, setPartials] = useState<any[]>([]);
  const [selectedPartial, setSelectedPartial] = useState<any | null>(null);

  const fetchPartials = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/partial/findAll`, {
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
