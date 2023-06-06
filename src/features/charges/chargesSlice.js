import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Charge'],
  endpoints: builder => ({
    createCharge: builder.mutation({
      query: initialCharge => ({
        url: '/charges',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(initialCharge)
      }),
      invalidatesTags: ['Charge']
    }),
    getCharge: builder.query({
      query: chargeId => `/charges/${chargeId}`,
      providesTags: (result, error, arg) => [{ type: 'Charge', id: arg }]
    }),
    getCharges: builder.query({
      query: caseId => `/charges?case=${caseId}`,
      providesTags: (result = [], error, arg) => [
        'Charge',
        ...result.map(({ id }) => ({ type: 'Charge', id }))
      ]
    }),
    updateCharge: builder.mutation({
      query: updatedCharge => ({
        url: `/charges/${updatedCharge.id}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(updatedCharge)
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Charge', id: arg.id }]
    })
  })
})

export const {
  useCreateChargeMutation,
  useGetChargeQuery,
  useGetChargesQuery,
  useUpdateChargeMutation
} = extendedAPISlice