import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      login: builder.mutation({
          query: credentials => ({
              url: '/login',
              method: 'POST',
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams(credentials)
          })
      })
    })
})

export const { useLoginMutation } = extendedAPISlice