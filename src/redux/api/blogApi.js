import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: `/blogs`,
        method: "GET",
      }),
      providesTags: ["BlogApi"],
    }),
  }),
});

export const { useGetBlogsQuery } = blogApi;