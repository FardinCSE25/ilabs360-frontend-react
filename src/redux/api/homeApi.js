import { baseApi } from "./baseApi";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeMetrics: builder.query({
      query: () => ({
        url: "/home-sections",
        method: "GET",
      }),
      providesTags: ["HomeApi"],
    }),
  }),
});

export const { useGetHomeMetricsQuery } = homeApi;
