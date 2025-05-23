import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Flight } from "../../types/flight";

export const flightsApi = createApi({
  reducerPath: "flightsApi",
  baseQuery: fetchBaseQuery({baseUrl: "https://679d13f487618946e6544ccc.mockapi.io/testove/v1"}),
  endpoints: (builder) => ({
    getFlights: builder.query<Flight[], void>({
      query: () => '/flights'
    }),
    getFlightById: builder.query<Flight, string>({
      query: (id) => `/flights/${id}`
    }),
  })
});

export const { useGetFlightsQuery, useGetFlightByIdQuery } = flightsApi;
