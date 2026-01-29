import { baseApi } from "./baseApi";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: `/about`,
        method: "GET",
      }),
      providesTags: ["AboutApi"],
    }),
    getHomeAbout: builder.query({
      query: () => ({
        url: `/about`,
        method: "GET",
      }),
      providesTags: ["AboutApi"],
    }),
  }),
});

export const { useGetAboutQuery, useGetHomeAboutQuery } = aboutApi;
