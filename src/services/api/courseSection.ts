
import { CourseSection, CreateCourseSection, UpdateCourseSection } from "../../interfaces/course-section";
import {PaginationQueryParamsType, peesadApi } from "../peesadApi";
export interface ApiResponse<T> {
  data?: T;
  message: string;
  status: boolean;
}
export interface ApiResponseAll<T> {
  status: boolean;
  data: T[];
  page: number;
  limit: number;
  total: number;
}

const courseSectionApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivitiesBySubject: builder.query<ApiResponse< any[]>, { subjectId: number }>({
      query: ({ subjectId }) => ({
        url: `activities/subject/${subjectId}`,
        method: 'GET',
      }),
      providesTags: (result ) => 
        result
          ? [
              ...(result.data ?? []).map(({ id }) => ({ type: 'Activity' as const, id })),
              { type: 'Activity', id: 'LIST' },
            ]
          : [{ type: 'Activity', id: 'LIST' }],
    }),
    getCourseSections: builder.query<ApiResponseAll<CourseSection>, PaginationQueryParamsType & { subjectId?: number }>({
      query: ({ page = 1, limit = 1, isActive, subjectId }) => ({
        url: `course-sections/findAll?page=${page}&limit=${limit}` +
          (isActive !== undefined ? `&isActive=${isActive}` : '') +
          (subjectId !== undefined ? `&subjectId=${subjectId}` : ''),
        method: 'GET',
      }),
      providesTags: (result) => 
        result 
          ? 
          [
            ...result.data.map(({ id }) => ({ type: 'CourseSection' as const, id })),
            { type: 'CourseSection', id: 'LIST' },
          ]
          : 
          [{ type: 'CourseSection', id: 'LIST' }],
    }),

    getCourseSection: builder.query<ApiResponse<CourseSection>, { id: number }>({
      query: ({ id }) => ({
        url: `course-sections/find/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'CourseSection', id: result?.data?.id }],
    }),

    addCourseSection: builder.mutation<ApiResponse<CourseSection>, CreateCourseSection>({
      query: (body) => ({
        url: 'course-sections/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'CourseSection', id: 'LIST' }],
    }),

    editCourseSection: builder.mutation<ApiResponse<CourseSection>, UpdateCourseSection & { id: number }>({
      query: (body) => ({
        url: `course-sections/update/${body.id}`,
        method: 'PATCH',
        body: { ...body, id: undefined },
      }),
      invalidatesTags: (result) => [{ type: 'CourseSection', id: result?.data?.id }, { type: 'CourseSection', id: 'LIST' }],
    }),
    switchControlSyllabus: builder.mutation<ApiResponse<any>, { sectionId: number, classId: number }>({
      query: ({ sectionId, classId }) => ({
        url: `switch-syllabus/${sectionId}/${classId}`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'CourseSection', id: 'LIST' }],
    }),
  }),
  overrideExisting: 'throw',
});

export const {

  useGetCourseSectionsQuery,
  useGetCourseSectionQuery,
  useAddCourseSectionMutation,
  useEditCourseSectionMutation,
  useGetActivitiesBySubjectQuery,
  useSwitchControlSyllabusMutation
} = courseSectionApi;