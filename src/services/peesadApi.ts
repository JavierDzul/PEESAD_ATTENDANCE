import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type PaginationQueryParamsType = {
  page?: number;
  limit?: number;
  isActive?: boolean;
};
export type PaginationQueryType = {
  page?: number;
  limit?: number;
  pageSize?:number;
  isActive?: boolean;
};

export const peesadApi = createApi({
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
    'Activity', 
    'CourseSection'  ,
    'ScheduledActivity',
    'SectionWeight',
    'ActivityWeight',
    'Weight'
  ],
  endpoints: () => ({}),
});
