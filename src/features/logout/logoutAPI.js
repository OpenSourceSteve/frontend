import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
                credentials: 'include',
            }),
            invalidatesTags: ['Profile']
        })
    })
})

export const { useLogoutMutation } = extendedAPISlice