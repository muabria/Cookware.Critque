import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = "/";

const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: backendURL,
        
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    endpoints: (builder) => ({
        //<------------------------------REGISTER ACCOUNT ENDPOINT------------------------------->
        register: builder.mutation({
            query: (user) => ({
                url: `/auth/register`, 
                method: 'POST',
                body: user,
            }),
        }),
        //<------------------------------LOGIN ACCOUNT ENDPOINT------------------------------->
        login: builder.mutation({
            query: (user) => ({
                url: `/auth/login`, 
                method: 'POST',
                body: user,
            }),
        }),

        //<------------------------------GET EQUIPMENT------------------------------->
        getEquipment: builder.query({
            query: () => ({
                url: `/api/equipment`,
                method: 'GET',
                   }),
        }),
         //<------------------------------GET USER------------------------------->
         getUser: builder.query({
            query: () => ({
                url: `/auth/account`, 
                method: 'GET',
            }),
        }),
           //<------------------------------ADD NEW REVIEW------------------------------->
           postReview: builder.mutation({
            query: (post) => ({
                url: `/api/review`, 
                method: 'POST',
                body: post,
            }),
        }),
          //<------------------------------GET EQUIPMENT BY ID------------------------------->
          getSingleEquipment: builder.query({
            query: (search) => ({
                url: `/api/equipment/${search ? "?search="+search :""}`,
                method: 'GET'
            }),
        }),
             //<------------------------------COMMENT------------------------------->
             postComment: builder.mutation({
                query: (comment) => ({
                    url: `/api/comment/`,
                    method: 'POST',
                    body: comment,
                }),
            }),
               //<------------------------------ALL POST------------------------------->
               getReviews: builder.query({
                query: () => ({
                    url: `/api/reviews/`,
                    method: 'GET',
                }),
            }),
           //<------------------------------ADD NEW EQUIPMENT------------------------------->
           postEquipment: builder.mutation({
            query: (equipment) => ({
                url: `/api/equipment/`, 
                method: 'POST',
                body: equipment,
            }),
        }),
    }),
})

export default api;

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    usePostReviewMutation,
    useGetEquipmentQuery,
    useGetSingleEquipmentQuery,
    usePostCommentMutation,
    useGetReviewsQuery,
    usePostEquipmentMutation,
} = api
