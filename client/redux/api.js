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
        //<---------------------------AUTHORIZATION--------------------------->
        //REGISTER ACCOUNT ENDPOINT
        register: builder.mutation({
            query: (user) => ({
                url: `/auth/register`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["Users"]
        }),
        //LOGIN ACCOUNT 
        login: builder.mutation({
            query: (user) => ({
                url: `/auth/login`,
                method: 'POST',
                body: user,
            }),
            providesTags: ["Users"]
        }),
        //LOGOUT ACCOUNT
        logout: builder.mutation({
            query: () => ({ 
                data: {} 
            }),
            invalidatesTags: ["Users"]
        }),
        //<---------------------------GET USER INFO--------------------------->
        //GET USER
        getUser: builder.query({
            query: () => ({
                url: `/auth/account`,
                method: 'GET',
            }),
            providesTags: ["Users"]
        }),
        //GET COMMENT BY USER
        getCommentByUser: builder.query({
            query: (user) => ({
                url: `/api/${user}/comments/`,
                method: 'GET',
            }),
            providesTags: ["Comments"]
        }),
        //GET REVIEW BY USER
        getReviewByUser: builder.query({
            query: (user) => ({
                url: `/api/${user}/reviews/`,
                method: 'GET',
            }),
            providesTags: ["Reviews"]
        }),


        //<---------------------------GET REVIEW INFO--------------------------->
        //ALL REVIEWS
        getReviews: builder.query({
            query: () => ({
                url: `/api/reviews/`,
                method: 'GET',
            }),
            providesTags: ["Reviews"]
        }),
        //GET REVIEWS BY EQUIPMENT
        getReviewByEquipment: builder.query({
            query: (id) => ({
                url: `/api/equipment/review/${id}`,
                method: 'GET',
            }),
            providesTags: ["Reviews"]
        }),
        //GET SINGLE REVIEW
        getSingleReview: builder.query({
            query: (id) => ({
                url: `/api/review/${id}`,
                method: 'GET',
            }),
            providesTags: ["Reviews"]
        }),

        //<---------------------------GET COMMENT INFO--------------------------->
        //GET ALL COMMENTS
        getComments: builder.query({
            query: () => ({
                url: `/api/comments`,
                method: 'GET',
            }),
            providesTags: ["Comments"]
        }),


        //<---------------------------GET CATEGORY INFO--------------------------->
        //GET ALL CATEGORIES
        getCategories: builder.query({
            query: () => ({
                url: `/api/categories`,
                method: 'GET',
            }),
            providesTags: ["Categories"]
        }),
        //GET SINGLE CATEGORY
        getSingleCategory: builder.query({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: 'GET',
            }),
            providesTags: ["Categories"]
        }),


        //<---------------------------GET EQUIPMENT INFO--------------------------->
        //GET EQUIPMENT
        getEquipment: builder.query({
            query: () => ({
                url: `/api/equipment`,
                method: 'GET',
            }),
            providesTags: ["Equipment"]
        }),
        getSingleEquipment: builder.query({
            query: (search) => ({
                url: `/api/equipment/${search ? "?search=" + search : ""}`,
                method: 'GET'
            }),
        }),

        //<---------------------------POST--------------------------->
        //ADD NEW REVIEW
        postReview: builder.mutation({
            query: (post) => ({
                url: `/api/review`,
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ["Reviews"]
        }),
        //ADD NEW COMMENT
        postComment: builder.mutation({
            query: (comment) => ({
                url: `/api/comment/`,
                method: 'POST',
                body: comment,
            }),
            invalidatesTags: ["Comments"]
        }),
        //ADD NEW EQUIPMENT
        postEquipment: builder.mutation({
            query: (equipment) => ({
                url: `/api/equipment/`,
                method: 'POST',
                body: equipment,
            }),
            invalidatesTags: ["Equipment"]
        }),
 //<---------------------------PATCH--------------------------->
//PATCH REVIEW
patchReview: builder.mutation({
    query: ({ id, review }) => ({
        url: `/api/review/${id}`,
        method: 'PATCH',
        body: { review } ,
    }),
    invalidatesTags: ["Reviews"]
}),
//PATCH USER
patchUser: builder.mutation({
    query: ({ id, user }) => ({
        url: `/auth/account/${id}/edit`,
        method: 'PATCH',
        body: { id, user } ,
    }),
    invalidatesTags: ["Users"]
}),
 //<---------------------------DELETE--------------------------->
       //DELETE REVIEW FOR USER
        deleteReviewForUser: builder.mutation({
            query: (id) => ({
                url: `/api/review/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Reviews"]
        }),
        //DELETE COMMENT FOR USER
        deleteCommentForUser: builder.mutation({
            query: (id, comment) => ({
                url: `/api/comment/user/${id}/`,
                method: 'DELETE',
                body: comment,
            }),
            invalidatesTags: ["Comments"]
        }),


        //<--------------------------------------ADMIN ONLY BACKENDS----------------------------------------->

        //GET ALL USERS
        getAllUsers: builder.query({
            query: () => ({
                url: `/auth/users`,
                method: 'GET',
            }),
            providesTags: ["Users"]
        }),
        //DELETE USER
        deleteUser: builder.mutation({
            query: (id, user) => ({
                url: `/auth/user/${id}`,
                method: 'DELETE',
                body: user
            }),
            invalidatesTags: ["Users"]
        }),
        //DELETE EQUIPMENT
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
            query: ({ id, isAdmin }) => ({
                url: `/auth/admin/${id}`,
                method: 'PATCH',
                body: { isAdmin },
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
    useLogoutMutation,
    //GET USER'S INFO
    useGetUserQuery,
    useGetCommentByUserQuery,
    useGetReviewByUserQuery,
    //GET REVIEW INFO
    useGetReviewsQuery,
    useGetReviewByEquipmentQuery,
    useGetSingleReviewQuery,
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
    //PATCH
    usePatchReviewMutation,
    usePatchUserMutation,
    //DELETE
    useDeleteReviewForUserMutation,
    useDeleteCommentForUserMutation,
    //ADMIN
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useDeleteEquipmentMutation,
    usePatchToggleAdminMutation,
} = api
