import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const supabaseUrl = 'https://mzuqlrknsylnjbevfytt.supabase.co';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: supabaseUrl}),
  endpoints: (builder) => ({})
});