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
         //<------------------------------GET USER------------------------------->
         getUser: builder.query({
            query: () => ({
                url: `/auth/account`, 
                method: 'GET',
            }),
        }),
          //<------------------------------GET EQUIPMENT BY ID------------------------------->
          getEquipment: builder.query({
            query: (search) => ({
                url: `/api/equipment/${search ? "?search="+search :""}`,
                method: 'GET'
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
    }),
})

export default api;

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    useGetEquipmentQuery,
    usePostEquipmentMutation,
} = api
