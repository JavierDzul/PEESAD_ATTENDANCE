// src/services/api/scheduledActivityApi.ts
import { ScheduledActivity, CreateScheduledActivity, UpdateScheduledActivity } from "../../interfaces/scheduled-activity";
import { PaginationQueryParamsType, peesadApi } from "../peesadApi";

export interface ApiResponse<T> {
  data?: T;
  message: string;
  status: boolean;
}

export interface ApiResponseAll<T> {
  status: boolean;
  data: T[];
  items: T[];
  page: number;
  limit: number;
  total: number;
}

const scheduledActivityApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    getScheduledActivities: builder.query<ApiResponseAll<ScheduledActivity>, PaginationQueryParamsType & { classId?: number }>({
      query: ({ page = 1, limit = 10, classId }) => ({
        url: `scheduled-activities?${classId ? `classId=${classId}&` : ''}page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...(result.data ?? []).map((activity) => ({ type: 'ScheduledActivity' as const, id: activity.id })),
              { type: 'ScheduledActivity', id: 'LIST' },
            ]
          : [{ type: 'ScheduledActivity', id: 'LIST' }],
    }),

    getScheduledActivity: builder.query<ApiResponse<ScheduledActivity>, { id: number }>({
      query: ({ id }) => ({
        url: `scheduled-activities/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'ScheduledActivity', id: result?.data?.id }],
    }),

    addScheduledActivity: builder.mutation<ApiResponse<ScheduledActivity>, CreateScheduledActivity>({
      query: (body) => ({
        url: 'scheduled-activities',
        method: 'POST',
        body,
      }),
      // Manejar el error de duplicado
      transformErrorResponse: (response: { status: number; data: any }) => {
        if (response.status === 400 && response.data?.message?.includes('already been scheduled')) {
          return {
            status: false,
            message: 'Esta actividad ya ha sido programada para esta clase',
            data: null
          };
        }
        return response.data;
      },
      invalidatesTags: [{ type: 'ScheduledActivity', id: 'LIST' }],
    }),

    editScheduledActivity: builder.mutation<ApiResponse<ScheduledActivity>, UpdateScheduledActivity>({
      query: (body) => ({
        url: `scheduled-activities/${body.id}`,
        method: 'PATCH',
        body: { ...body, id: undefined },
      }),
      // Manejar el error de duplicado
      transformErrorResponse: (response: { status: number; data: any }) => {
        if (response.status === 400 && response.data?.message?.includes('already been scheduled')) {
          return {
            status: false,
            message: 'Esta actividad ya ha sido programada para esta clase',
            data: null
          };
        }
        return response.data;
      },
      invalidatesTags: (result) => [
        { type: 'ScheduledActivity', id: result?.data?.id },
        { type: 'ScheduledActivity', id: 'LIST' }
      ],
    }),

    deleteScheduledActivity: builder.mutation<ApiResponse<null>, { id: number }>({
      query: ({ id }) => ({
        url: `scheduled-activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ScheduledActivity', id: 'LIST' }],
    }),
  }),
  overrideExisting: 'throw',
});

export const {
  useGetScheduledActivitiesQuery,
  useGetScheduledActivityQuery,
  useAddScheduledActivityMutation,
  useEditScheduledActivityMutation,
  useDeleteScheduledActivityMutation,
} = scheduledActivityApi;