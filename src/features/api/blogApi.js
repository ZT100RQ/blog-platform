import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://blog-platform.kata.academy/api';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.user?.user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Articles', 'User', 'Article'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => '/user',
      providesTags: ['User'],
    }),
    fetchArticles: builder.query({
      query: (num) => `articles?limit=5&offset=${num}`,
      providesTags: ['Articles'],
    }),
    fetchArticle: builder.query({
      query: (slug) => `/articles/${slug} `,
      providesTags: ['Article'],
    }),
    createNewUser: builder.mutation({
      query: ({ username, email, password }) => ({
        url: '/users',
        method: 'POST',
        body: {
          user: {
            username: username,
            email: email,
            password: password,
          },
        },
      }),
    }),
    postUserLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          user: {
            email: email,
            password: password,
          },
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: 'user',
        method: 'PUT',
        body: {
          user: user,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  usePostUserLoginMutation,
  useGetCurrentUserQuery,
  useFetchArticlesQuery,
  useFetchArticleQuery,
  useCreateNewUserMutation,
  useUpdateUserMutation,
} = blogApi;
