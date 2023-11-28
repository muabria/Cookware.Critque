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

    tagTypes: ["Reviews", "Comments", "Users"],
    //equipment, reviews, users, comments, add Equipment
    //unique

    endpoints: (builder) => ({
        //<--------------------REGISTER ACCOUNT ENDPOINT--------------------->
        register: builder.mutation({
            query: (user) => ({
                url: `/auth/register`,
                method: 'POST',
                body: user,
            }),
        }),
        //<--------------------LOGIN ACCOUNT ENDPOINT--------------------->
        login: builder.mutation({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user,
            }),
        }),

        //<-------------------GET USER--------------------->
        getUser: builder.query({
            query: () => ({
                url: `/auth/account`,
                method: 'GET',
            }),
        }),
        //<-------------------GET COMMENT BY USER--------------------->
        getCommentByUser: builder.query({
            query: (user) => ({
                url: `/api/${user}/comments/`,
                method: 'GET',
            }),
        }),
        //<-------------------GET REVIEW BY USER--------------------->
        getReviewByUser: builder.query({
            query: (user) => ({
                url: `/api/${user}/reviews/`,
                method: 'GET',
            }),
            providesTags: ["Reviews"]
        }),
        //<------------------GET ALL CATEGORIES-------------------->
        getCategories: builder.query({
            query: () => ({
                url: `/api/categories`,
                method: 'GET',
            }),
        }),
         //<------------------GET SINGLE CATEGORY-------------------->
         getSingleCategory: builder.query({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: 'GET',
            }),
        }),

        //<--------------------GET EQUIPMENT--------------------->
        getEquipment: builder.query({
            query: () => ({
                url: `/api/equipment`,
                method: 'GET',
            }),
        }),
        //<--------------------ADD NEW REVIEW---------------------->
        postReview: builder.mutation({
            query: (post) => ({
                url: `/api/review`,
                method: 'POST',
                body: post,
            }),
        }),
        //<--------------------GET EQUIPMENT BY ID--------------------->
        getSingleEquipment: builder.query({
            query: (search) => ({
                url: `/api/equipment/${search ? "?search=" + search : ""}`,
                method: 'GET'
            }),
        }),
        //<--------------------COMMENT----------------------->
        postComment: builder.mutation({
            query: (comment) => ({
                url: `/api/comment/`,
                method: 'POST',
                body: comment,
            }),
        }),
        //<----------------------ALL REVIEWS--------------------->
        getReviews: builder.query({
            query: () => ({
                url: `/api/reviews/`,
                method: 'GET',
            }),
        }),
        //<--------------------ADD NEW EQUIPMENT--------------------->
        postEquipment: builder.mutation({
            query: (equipment) => ({
                url: `/api/equipment/`,
                method: 'POST',
                body: equipment,
            }),
        }),
        //<-------------------GET REVIEW BY EQUIPMENT--------------------->
        reviewByEquipment: builder.query({
            query: (id) => ({
                url: `/api/equipment/review/${id}`,
                method: 'GET',
            }),
        }),
        //<--------------------GET ALL COMMENTS-------------------->
        getComments: builder.query({
            query: () => ({
                url: `/api/comments`,
                method: 'GET',
            }),
        }),
        //<--------------------DELETE REVIEW FOR USER--------------------->
        deleteReviewForUser: builder.mutation({
            query: (id) => ({
                url: `/api/review/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Reviews"]
        }),
        //<--------------------DELETE COMMENT FOR USER--------------------->
        deleteCommentForUser: builder.mutation({
            query: ( id, comment) => ({
                url: `/api/review/user/${id}/`,
                method: 'DELETE',
                body: comment,
            }),
            invalidatesTags: ["Comments"]
        }),


        //<--------------------------------------ADMIN ONLY BACKENDS----------------------------------------->

        //<--------------------GET ALL USERS--------------------->
        getAllUsers: builder.query({
            query: () => ({
                url: `/auth/users`,
                method: 'GET',
            }),
        }),

        deleteUser: builder.mutation({
            query: (id, user) => ({
                url: `/user/${id}`,
                method: 'DELETE',
                body: user
            }),
            invalidatesTags: ["Users"]
        }),

    }),
})

export default api;

export const {
//AUTHORIZATION
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    useGetCommentByUserQuery,
    useGetReviewByUserQuery,
    useGetCategoriesQuery,
    useGetSingleCategoryQuery,
    useGetEquipmentQuery,
    usePostReviewMutation,
    useGetSingleEquipmentQuery,
    usePostCommentMutation,
    useGetReviewsQuery,
    usePostEquipmentMutation,
    useReviewByEquipmentQuery,
    useGetCommentsQuery,
    useDeleteReviewForUserMutation,
//ADMIN
    useGetAllUsersQuery,
    useDeleteUserMutation,
} = api
