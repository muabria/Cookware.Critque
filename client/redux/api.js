import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = "/";

const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: backendURL,

        prepareHeaders: (headers, { getState }) => {
            const token = getState().token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
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
        //<------------------------------GET EQUIPMENT BY ID------------------------------->
        getEquipment: builder.query({
            query: (search) => ({
                url: `/api/equipment/`,
                method: 'GET'
            }),
        }),
        //<------------------------------NEW COMMENT------------------------------->
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
        //<------------------------------MAKE POST------------------------------->
        postEquipment: builder.mutation({
            query: (equipment) => ({
                url: `/api/equipment/`,
                method: 'POST',
                body: equipment,
            }),
        }),
        //<------------------------------GET REVIEW BY EQUIPMENT------------------------------->
        reviewByEquipment: builder.query({
            query: (id) => ({
                url: `/api/equipment/review/${id}`,
                method: 'GET',
            }),
        }),
    }),
})

export default api;

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetEquipmentQuery,
    usePostCommentMutation,
    useGetReviewsQuery,
    usePostEquipmentMutation,
    useReviewByEquipmentQuery
} = api
