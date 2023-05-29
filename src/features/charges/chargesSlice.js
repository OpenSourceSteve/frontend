import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Charge'],
  endpoints: builder => ({
    getCharges: builder.query({
      query: () => '/charges',
      providesTags: (result = [], error, arg) => [
        'Charge',
        ...result.map(({ id }) => ({ type: 'Charge', id }))
      ]
    }),
  })
})

export const {
  useGetChargesQuery
} = extendedAPISlice