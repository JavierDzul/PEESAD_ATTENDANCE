import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export type PaginationQueryType = {
  page?: number;
  limit?: number;
  isActive?: boolean;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Classes', 
    'Teacher', 
    'Attendance', 
    'Partial',
    'User',
  ],
  endpoints: () => ({}),
});
