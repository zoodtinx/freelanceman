import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
   reducerPath: 'projectApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
   endpoints: (builder) => ({
     getProject: builder.query({
        query: () => '/',
     }),
   }),
 });
 
 export const { useGetProjectQuery } = projectApi;