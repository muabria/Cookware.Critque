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
        //<---------------------------AUORIZATION--------------------------->
        //<-----------REGISTER ACCOUNT ENDPOINT----------->
        register: builder.mutation({
            query: (user) => ({
                url: `/auth/register`,
                method: 'POST',
                body: user,
            }),
        }),
        //<----------LOGIN ACCOUNT ENDPOINT----------->
        login: builder.mutation({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user,
            }),
        }),


        //<---------------------------GET USER INFO--------------------------->
        //<---------GET USER----------->
        getUser: builder.query({
            query: () => ({
                url: `/auth/account`,
                method: 'GET',
            }),
        }),
        //<---------GET COMMENT BY USER------------>
        getCommentByUser: builder.query({
            query: (user) => ({
                url: `/api/${user}/comments/`,
                method: 'GET',
            }),
        }),
        //<--------GET REVIEW BY USER---------->
        getReviewByUser: builder.query({
            query: (user) => ({
                url: `/api/${user}/reviews/`,
                method: 'GET',
            }),
            providesTags: ["Reviews"]
        }),


        //<---------------------------GET REVIEW INFO--------------------------->
        //<------------ALL REVIEWS----------->
        getReviews: builder.query({
            query: () => ({
                url: `/api/reviews/`,
                method: 'GET',
            }),
        }),
        //<---------GET REVIEW BY EQUIPMENT----------->
        reviewByEquipment: builder.query({
            query: (id) => ({
                url: `/api/equipment/review/${id}`,
                method: 'GET',
            }),
        }),

        //<---------------------------GET COMMENT INFO--------------------------->
        //<----------GET ALL COMMENTS---------->
        getComments: builder.query({
            query: () => ({
                url: `/api/comments`,
                method: 'GET',
            }),
        }),


        //<---------------------------GET CATEGORY INFO--------------------------->
        //<--------GET ALL CATEGORIES---------->
        getCategories: builder.query({
            query: () => ({
                url: `/api/categories`,
                method: 'GET',
            }),
        }),
        //<---------GET SINGLE CATEGORY---------->
        getSingleCategory: builder.query({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: 'GET',
            }),
        }),


        //<---------------------------GET EQUIPMENT INFO--------------------------->
        //<----------GET EQUIPMENT----------->
        getEquipment: builder.query({
            query: () => ({
                url: `/api/equipment`,
                method: 'GET',
            }),
        }),
        //<----------GET EQUIPMENT BY ID----------->
        getSingleEquipment: builder.query({
            query: (search) => ({
                url: `/api/equipment/${search ? "?search=" + search : ""}`,
                method: 'GET'
            }),
        }),


         //<---------------------------POST--------------------------->
        //<----------ADD NEW REVIEW------------>
        postReview: builder.mutation({
            query: (post) => ({
                url: `/api/review`,
                method: 'POST',
                body: post,
            }),
        }),
        //<----------ADD NEW COMMENT------------->
        postComment: builder.mutation({
            query: (comment) => ({
                url: `/api/comment/`,
                method: 'POST',
                body: comment,
            }),
        }),
        //<----------ADD NEW EQUIPMENT----------->
        postEquipment: builder.mutation({
            query: (equipment) => ({
                url: `/api/equipment/`,
                method: 'POST',
                body: equipment,
            }),
        }),

 //<---------------------------DELETE--------------------------->
        //<-----------DELETE REVIEW FOR USER----------->
        deleteReviewForUser: builder.mutation({
            query: (id) => ({
                url: `/api/review/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Reviews"]
        }),
        //<----------DELETE COMMENT FOR USER---------->
        deleteCommentForUser: builder.mutation({
            query: (id, comment) => ({
                url: `/api/comment/user/${id}/`,
                method: 'DELETE',
                body: comment,
            }),
            invalidatesTags: ["Comments"]
        }),


        //<--------------------------------------ADMIN ONLY BACKENDS----------------------------------------->

        //<----------GET ALL USERS------------->
        getAllUsers: builder.query({
            query: () => ({
                url: `/auth/users`,
                method: 'GET',
            }),
        }),
        //<----------DELETE USER------------->
        deleteUser: builder.mutation({
            query: (id, user) => ({
                url: `/auth/user/${id}`,
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
    //GET USER'S INFO
    useGetUserQuery,
    useGetCommentByUserQuery,
    useGetReviewByUserQuery,
    //GET REVIEW INFO
    useGetReviewsQuery,
    useReviewByEquipmentQuery,
    //GET COMMENT INFO
    useGetCommentsQuery,
    //GET CATEGORY INFO
    useGetCategoriesQuery,
    useGetSingleCategoryQuery,
    //GET EQUIPMENT INFO
    useGetEquipmentQuery,
    useGetSingleEquipmentQuery,
    //POST 
    usePostReviewMutation,
    usePostCommentMutation,
    usePostEquipmentMutation,
    //DELETE
    useDeleteReviewForUserMutation,
    useDeleteCommentForUserMutation,
    //ADMIN
    useGetAllUsersQuery,
    useDeleteUserMutation,
} = api
