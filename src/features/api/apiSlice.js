import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_DOMAIN,
    credentials: 'include'
  }),
  endpoints: () => ({})
})