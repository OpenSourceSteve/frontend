import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Task'],
  endpoints: builder => ({
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: (result = [], error, arg) => [
        'Task',
        ...result.map(({ id }) => ({ type: 'Task', id }))
      ]
    }),
  })
})

export const {
  useGetTasksQuery
} = extendedAPISlice