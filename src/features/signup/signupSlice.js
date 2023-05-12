import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      signup: builder.mutation({
          query: userInfo => ({
              url: '/signup',
              method: 'POST',
              headers: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams(userInfo)
          })
      })
    })
})

export const { useSignupMutation } = extendedAPISlice