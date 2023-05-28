// import { createSelector } from '@reduxjs/toolkit'

import { apiSlice } from '../api/apiSlice';

export const extendedAPISlice = apiSlice.injectEndpoints({
  tagTypes: ['Case'],
  endpoints: builder => ({
    createCase: builder.mutation({
      query: initialCase => ({
        url: '/cases',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(initialCase)
      }),
      invalidatesTags: ['Case']
    }),
    getCase: builder.query({
      query: caseId => `/cases/${caseId}`,
      providesTags: (result, error, arg) => [{ type: 'Case', id: arg }]
    }),
    getCases: builder.query({
      query: () => '/cases',
      providesTags: (result = [], error, arg) => [
        'Case',
        ...result.map(({ id }) => ({ type: 'Case', id }))
      ]
    }),
    updateCase: builder.mutation({
      query: updatedCase => ({
        url: `/cases/${updatedCase.id}`,
        method: 'PUT',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(updatedCase)
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Case', id: arg.id }]
    })
  })
})

export const {
    useCreateCaseMutation,
    useGetCaseQuery,
    useGetCasesQuery,
    useUpdateCaseMutation
} = extendedAPISlice

export const selectCasesResult = extendedAPISlice.endpoints.getCases.select()