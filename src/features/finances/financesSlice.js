import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Finances'],
  endpoints: builder => ({
    getFinances: builder.query({
      query: () => '/finances',
      providesTags: (result = [], error, arg) => [
        'Finances',
        ...result.map(({ id }) => ({ type: 'Finances', id }))
      ]
    }),
  })
})

export const {
  useGetFinancesQuery
} = extendedAPISlice