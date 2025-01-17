import { Attendance } from '../../interfaces/attendance';
import type { Class } from '../../interfaces/class';
import { Partial } from '../../interfaces/partial';
import { ApiResponse } from '../../interfaces/response';
import type { ApiResponseAll } from '../../interfaces/response-all';
import { Student } from '../../interfaces/student';
import { Teacher } from '../../interfaces/teacher';
import {  PaginationQueryType, peesadApi } from '../peesadApi';

export type AttendanceQueryType = {
  student: Student;
  totalAbsences: number;
  attendances: Attendance[];
};

const classApi = peesadApi.injectEndpoints({
  endpoints: (build) => ({
    getClassesByTeacherId: build.query<
      ApiResponseAll<Class>,
      PaginationQueryType & { teacherId: number }
    >({
      query: ({ page = 1, pageSize = 1, isActive, teacherId }) => ({
        url: `class/findAll?page=${page}&pageSize=${pageSize}&teacherId=${teacherId}${
          isActive ? '&isCurrent=' + isActive : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['Classes'],
    }),
    getClassesByTeacherIdStudents: build.query<
    ApiResponseAll<Class>,
    PaginationQueryType & { teacherId: number }
  >({
    query: ({ page = 1, pageSize = 1, isActive, teacherId }) => ({
      url: `class/findAllTeacher?page=${page}&pageSize=${pageSize}&teacherId=${teacherId}${
        isActive ? '&isCurrent=' + isActive : ''
      }`,
      method: 'GET',
    }),
    providesTags: ['Classes'],
  }),
    getTeacherById: build.query<ApiResponse<Teacher>, number>({
      query: (id) => ({
        url: `teachers/${id}`,
        method: 'GET',
      }),
      providesTags: ['Teacher'],
    }),
    getAttendancesByRange: build.query<
      { status: boolean; data: AttendanceQueryType[]; total: number },
      { classId?: number; partial?: number }
    >({
      query: ({ classId, partial }) => ({
        url: `attendance/by-range?${classId ? `classId=${classId}` : ''}${
          partial ? `&partial=${partial}` : ''
        }`,
        method: 'GET',
      }),
      providesTags: ['Attendance'],
    }),
    getPartialsByClassId: build.query<
      ApiResponseAll<Partial>,
      PaginationQueryType & { classId: number }
    >({
      query: ({ page = 1, limit = 10, classId }) => ({
        url: `partial/findAll?page=${page}&limit=${limit}&classId=${classId}`,
        method: 'GET',
      }),
      providesTags: ['Partial'],
    }),
  }),
  overrideExisting: 'throw',
});

export const {
  useGetClassesByTeacherIdStudentsQuery,
  useGetClassesByTeacherIdQuery,
  useGetAttendancesByRangeQuery,
  useGetTeacherByIdQuery,
  useGetPartialsByClassIdQuery,
} = classApi;
