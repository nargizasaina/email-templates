import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import supabase from '../../supabaseClient';

export const supabaseApi = createApi({   
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        let users = await supabase
        .from('users')
        .select()

        return { data: users }
      }
    }),

    login: builder.mutation({
      query: (payload) => ({
          url: "/users",
          method: "POST",
          body: payload,
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          },
          responseType: 'json',
      }),
  }),
  }),
   
});

export const { useGetUsersQuery, useLoginMutation } = supabaseApi;