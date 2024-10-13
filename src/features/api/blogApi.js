import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://blog-platform.kata.academy/api';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    fetchArticles: builder.query({
      query: (num) => `articles?limit=5&offset=${num}`,
    }),
    fetchArticle: builder.query({
      query: (slug) => `/articles/${slug} `,
    }),
  }),
});

export const { useFetchArticlesQuery, useFetchArticleQuery } = blogApi;
