import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
                credentials: 'include',
            }),
            invalidatesTags: ['Profile']
        })
    })
})

export const { useLoginMutation } = extendedAPISlice