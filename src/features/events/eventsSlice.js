import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Event'],
  endpoints: builder => ({
    getEvents: builder.query({
      query: () => '/events',
      providesTags: (result = [], error, arg) => [
        'Event',
        ...result._embedded.events.map(({ id }) => ({ type: 'Event', id }))
      ]
    }),
  })
})

export const {
  useGetEventsQuery
} = extendedAPISlice