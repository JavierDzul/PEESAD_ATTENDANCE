import { Activity, CreateActivity, UpdateActivity } from "../../interfaces/activity";
import { peesadApi } from "../peesadApi";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiResponseAll<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

const activityApi = peesadApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivity: builder.query<ApiResponse<Activity>, number>({
      query: (id) => ({
        url: `activities/find/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'Activity', id: result?.data?.id }],
    }),

    getActivitiesBySection: builder.query<ApiResponseAll<Activity>, { sectionId: number, page?: number, limit?: number }>({
      query: ({ sectionId, page = 1, limit = 10 }) => ({
        url: `activities/section/${sectionId}`,
        method: 'GET',
        params: {
          page,
          limit,
        },
      }),
      providesTags: (result) => 
        result 
          ? 
          [
            ...result.data.map(({ id }) => ({ type: 'Activity' as const, id })),
            { type: 'Activity', id: 'LIST' },
          ]
          : 
          [{ type: 'Activity', id: 'LIST' }],
    }),

    addActivity: builder.mutation<ApiResponse<Activity>, CreateActivity>({
      query: (body) => ({
        url: 'activities/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Activity', id: 'LIST' }],
    }),

    editActivity: builder.mutation<ApiResponse<Activity>, UpdateActivity & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `activities/update/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Activity', id: result?.data?.id },
        { type: 'Activity', id: 'LIST' }
      ],
    }),

    deleteActivity: builder.mutation<void, number>({
      query: (id) => ({
        url: `activities/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Activity', id: 'LIST' }],
    }),

    restoreActivity: builder.mutation<ApiResponse<Activity>, number>({
      query: (id) => ({
        url: `activities/restore/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: (result) => [
        { type: 'Activity', id: result?.data?.id },
        { type: 'Activity', id: 'LIST' }
      ],
    }),
  }),
  overrideExisting: 'throw',
});

export const {
  useGetActivityQuery,
  useGetActivitiesBySectionQuery,
  useAddActivityMutation,
  useEditActivityMutation,
  useDeleteActivityMutation,
  useRestoreActivityMutation,
} = activityApi;