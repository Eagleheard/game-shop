import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchUsers = createApi({
  reducerPath: 'fetchUsers',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: (user) => `${user}`,
    }),
  }),
});

export const { useGetUsersQuery } = fetchUsers;
