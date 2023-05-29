import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Note'],
  endpoints: builder => ({
    getNotes: builder.query({
      query: () => '/notes',
      providesTags: (result = [], error, arg) => [
        'Note',
        ...result.map(({ id }) => ({ type: 'Note', id }))
      ]
    }),
  })
})

export const {
  useGetNotesQuery
} = extendedAPISlice