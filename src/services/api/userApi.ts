import { User } from "../../interfaces/auth-response";
import { ApiResponse } from "../../interfaces/response";
import { api } from "../peesadApi";



export const userApi = api.enhanceEndpoints({addTagTypes:['User']}).injectEndpoints({

    endpoints: (builder) => ({

          createUser: builder.mutation<ApiResponse<User>, User>({
            query: (user) => ({
              url: 'users',
              method: 'POST',
              body: user,
            }),
            invalidatesTags: ['User'],
          }),

    }),

    overrideExisting: 'throw',

})

export const { useCreateUserMutation } = userApi