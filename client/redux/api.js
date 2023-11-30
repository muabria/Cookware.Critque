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

    tagTypes: ["Reviews", "Comments", "Users", "Equipment", "Categories"],
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
            providesTags: ["Users"]
        }),
        //<---------GET COMMENT BY USER------------>
        getCommentByUser: builder.query({
            query: (user) => ({
                url: `/api/${user}/comments/`,
                method: 'GET',
            }),
            providesTags: ["Comments"]
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
            providesTags: ["Reviews"]
        }),
        //<---------GET REVIEW BY EQUIPMENT----------->
        reviewByEquipment: builder.query({
            query: (id) => ({
                url: `/api/equipment/review/${id}`,
                method: 'GET',
            }),
            providesTags: ["Reviews"]
        }),

        //<---------------------------GET COMMENT INFO--------------------------->
        //<----------GET ALL COMMENTS---------->
        getComments: builder.query({
            query: () => ({
                url: `/api/comments`,
                method: 'GET',
            }),
            providesTags: ["Comments"]
        }),


        //<---------------------------GET CATEGORY INFO--------------------------->
        //<--------GET ALL CATEGORIES---------->

        getCategories: builder.query({
            query: () => ({
                url: `/api/categories`,
                method: 'GET',
            }),
            providesTags: ["Categories"]
        }),
        //<---------GET SINGLE CATEGORY---------->
        getSingleCategory: builder.query({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: 'GET',
            }),
            providesTags: ["Categories"]
        }),


        //<---------------------------GET EQUIPMENT INFO--------------------------->
        //<----------GET EQUIPMENT----------->
        getEquipment: builder.query({
            query: () => ({
                url: `/api/equipment`,
                method: 'GET',
            }),
            providesTags: ["Equipment"]
        }),
        //<----------GET EQUIPMENT BY ID----------->
        getSingleEquipment: builder.query({
            query: (search) => ({
                url: `/api/equipment/${search ? "?search=" + search : ""}`,
                method: 'GET'
            }),
            providesTags: ["Equipment"]
        }),


         //<---------------------------POST--------------------------->
        //<----------ADD NEW REVIEW------------>
        postReview: builder.mutation({
            query: (post) => ({
                url: `/api/review`,
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ["Reviews"]
        }),
        //<----------ADD NEW COMMENT------------->
        postComment: builder.mutation({
            query: (comment) => ({
                url: `/api/comment/`,
                method: 'POST',
                body: comment,
            }),
            invalidatesTags: ["Comments"]
        }),
        //<----------ADD NEW EQUIPMENT----------->
        postEquipment: builder.mutation({
            query: (equipment) => ({
                url: `/api/equipment/`,
                method: 'POST',
                body: equipment,
            }),
            invalidatesTags: ["Equipment"]
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
            providesTags: ["Users"]
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
          //<----------DELETE EQUIPMENT------------->
          deleteEquipment: builder.mutation({
            query: (id, equipment) => ({
                url: `/api/equipment/${id}`,
                method: 'DELETE',
                body: equipment
            }),
            invalidatesTags: ["Equipment"]
        }),
        //<------------------TOGGLE ADMIN-------------------->
        patchToggleAdmin: builder.mutation({
            query: (id, toggle) => ({
                url: `/api/category/${id}`,
                method: 'PATCH',
                body: toggle,
            }),
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
    useDeleteEquipmentMutation,
    usePatchToggleAdminMutation,
} = api
