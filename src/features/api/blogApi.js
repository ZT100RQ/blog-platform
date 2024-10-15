import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://blog-platform.kata.academy/api';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('blog-platform-token');
      if (token) {
        headers.set('Authorization', `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => '/user',
      // prepareHeaders: (headers) => {
      //   const token = localStorage.getItem('blog-platform-token');
      //   if (token) {
      //     headers.set('Authorization', `Token ${token}`);
      //   }
      //   return headers;
      // },
    }),
    fetchArticles: builder.query({
      query: (num) => `articles?limit=5&offset=${num}`,
    }),
    fetchArticle: builder.query({
      query: (slug) => `/articles/${slug} `,
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
  }),
});

export const {
  usePostUserLoginMutation,
  useGetCurrentUserQuery,
  useFetchArticlesQuery,
  useFetchArticleQuery,
  useCreateNewUserMutation,
} = blogApi;
