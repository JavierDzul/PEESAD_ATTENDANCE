import { 
    Weight, 
    SectionWeight, 
    ActivityWeight,
    CreateSectionWeight,
    CreateWeight,
    CreateActivityWeight,
    UpdateSectionWeight,
    UpdateWeight,
    UpdateActivityWeight
  } from "../../interfaces/weight";
  import { PaginationQueryParamsType, peesadApi } from "../peesadApi";
  import { ApiResponse } from "../../interfaces/response";
  
export interface ApiResponseAll<T> {
    status: boolean;
    data: T[];
    items: T[];
    page: number;
    limit: number;
    total: number;
  }
  const weightApi = peesadApi.injectEndpoints({
    endpoints: (builder) => ({
      // Section Weights Endpoints
      getSectionWeights: builder.query<
        ApiResponseAll<any>, 
        { classId: number } & PaginationQueryParamsType
      >({
        query: ({ classId, page = 1, limit = 10 }) => ({
          url: `weights/section?classId=${classId}&page=${page}&limit=${limit}`,
          method: 'GET',
        }),
        providesTags: (result) =>
          result
            ? [
                ...(result.items ?? []).map((section) => ({ 
                  type: 'SectionWeight' as const, 
                  id: section.id 
                })),
                { type: 'SectionWeight', id: 'LIST' },
              ]
            : [{ type: 'SectionWeight', id: 'LIST' }],
      }),
  
      createSectionWeight: builder.mutation<
        ApiResponse<SectionWeight>, 
        CreateSectionWeight
      >({
        query: (body) => ({
          url: 'weights/section',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: 'SectionWeight', id: 'LIST' }],
        transformErrorResponse: (response: { status: number; data: any }) => {
          if (response.status === 400) {
            return {
              status: false,
              message: response.data.message || 'Error al crear la sección de peso',
              data: null
            };
          }
          return response.data;
        },
      }),
  
      updateSectionWeight: builder.mutation<
        ApiResponse<SectionWeight>, 
        UpdateSectionWeight
      >({
        query: ({ id, ...body }) => ({
          url: `weights/section/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: (result) => [
          { type: 'SectionWeight', id: result?.data?.id },
          { type: 'SectionWeight', id: 'LIST' }
        ],
      }),
  
      // Weights Endpoints
      getWeights: builder.query<
        ApiResponseAll<Weight>, 
        { sectionWeightId: number } & PaginationQueryParamsType
      >({
        query: ({ sectionWeightId, page = 1, limit = 10 }) => ({
          url: `weights/weight?sectionWeightId=${sectionWeightId}&page=${page}&limit=${limit}`,
          method: 'GET',
        }),
        providesTags: (result) =>
          result
            ? [
                ...(result.items ?? []).map((weight) => ({ 
                  type: 'Weight' as const, 
                  id: weight.id 
                })),
                { type: 'Weight', id: 'LIST' },
              ]
            : [{ type: 'Weight', id: 'LIST' }],
      }),
  
      createWeight: builder.mutation<ApiResponse<Weight>, CreateWeight>({
        query: (body) => ({
          url: 'weights/weight',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: 'Weight', id: 'LIST' }],
        transformErrorResponse: (response: { status: number; data: any }) => {
          if (response.status === 400) {
            if (response.data?.message?.includes('exceed 100%')) {
              return {
                status: false,
                message: 'El porcentaje total no puede exceder el 100%',
                data: null
              };
            }
          }
          return response.data;
        },
      }),
  
      updateWeight: builder.mutation<ApiResponse<Weight>, UpdateWeight>({
        query: ({ id, ...body }) => ({
          url: `weights/weight/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: (result) => [
          { type: 'Weight', id: result?.data?.id },
          { type: 'Weight', id: 'LIST' }
        ],
        transformErrorResponse: (response: { status: number; data: any }) => {
          if (response.status === 400) {
            if (response.data?.message?.includes('exceed 100%')) {
              return {
                status: false,
                message: 'El porcentaje total no puede exceder el 100%',
                data: null
              };
            }
          }
          return response.data;
        },
      }),
  
      // Activity Weights Endpoints
      createActivityWeight: builder.mutation<
        ApiResponse<ActivityWeight>, 
        CreateActivityWeight
      >({
        query: (body) => ({
          url: 'weights/activity',
          method: 'POST',
          body,
        }),
        invalidatesTags: [
          { type: 'ActivityWeight', id: 'LIST' },
          { type: 'Weight', id: 'LIST' }
        ],
        transformErrorResponse: (response: { status: number; data: any }) => {
          if (response.status === 400) {
            if (response.data?.message?.includes('exceed 100%')) {
              return {
                status: false,
                message: 'El porcentaje total no puede exceder el 100%',
                data: null
              };
            }
          }
          return response.data;
        },
      }),
    }),
  });
  
  // Asegúrate de que los tipos estén definidos en tu peesadApi
  export type WeightApiTypes = typeof weightApi;
  
  export const {
    useGetSectionWeightsQuery,
    useCreateSectionWeightMutation,
    useUpdateSectionWeightMutation,
    useGetWeightsQuery,
    useCreateWeightMutation,
    useUpdateWeightMutation,
    useCreateActivityWeightMutation,
  } = weightApi;