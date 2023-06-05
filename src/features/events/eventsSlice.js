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
    getEvent: builder.query({
      query: eventId => `/events/${eventId}`,
      providesTags: (result, error, arg) => [{ type: 'Event', id: arg }]
    }),
    getEvents: builder.query({
      query: () => '/events',
      providesTags: (result = [], error, arg) => [
        'Event',
        ...result.map(({ id }) => ({ type: 'Event', id }))
      ]
    }),
    updateEvent: builder.mutation({
      query: updatedEvent => ({
        url: `/events/${updatedEvent.id}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(updatedEvent)
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Event', id: arg.id }]
    })
  })
})

export const {
  useCreateEventMutation,
  useGetEventQuery,
  useGetEventsQuery,
  useUpdateEventMutation
} = extendedAPISlice