import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Client', 'PotentialClient'],
  endpoints: builder => ({
    createClient: builder.mutation({
      query: initialClient => ({
        url: '/clients',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(initialClient)
      }),
      invalidatesTags: ['Client']
    }),
    getClient: builder.query({
      query: clientId => `/clients/${clientId}`,
      providesTags: (result, error, arg) => [{ type: 'Client', id: arg }]
    }),
    getClients: builder.query({
      query: () => '/clients',
      providesTags: (result = [], error, arg) => [
        'Client',
        ...result.map(({ id }) => ({ type: 'Client', id }))
      ]
    }),
    getClientsWithName: builder.query({
      query: (clientName) => `/clients?name=${clientName}`,
      provideTags: ['PotentialClient']
    }),
    updateClient: builder.mutation({
      query: updatedClient => ({
        url: `/clients/${updatedClient.id}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(updatedClient)
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Client', id: arg.id }]
    })
  })
})

export const {
  useCreateClientMutation,
  useGetClientQuery,
  useGetClientsQuery,
  useGetClientsWithNameQuery,
  useUpdateClientMutation
} = extendedAPISlice

export const selectClientsResult = extendedAPISlice.endpoints.getClients.select()