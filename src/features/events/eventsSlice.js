import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Event'],
  endpoints: builder => ({
    createEvent: builder.mutation({
      query: initialEvent => ({
        url: '/events',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(initialEvent)
      }),
      invalidatesTags: ['Event']
    }),
    getEvents: builder.query({
      query: () => '/events',
      providesTags: (result = [], error, arg) => [
        'Event',
        ...result.map(({ id }) => ({ type: 'Event', id }))
      ]
    }),
  })
})

export const {
  useCreateEventMutation,
  useGetEventsQuery
} = extendedAPISlice