import { createSlice } from '@reduxjs/toolkit';
import api from './api';


// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth",
    initialState: { token: null, user: null },
    reducers: {
        logout: (_state) => ({ token: null, user: null })
    },

    // Handle the 'register' API call success
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
            }
        )

        // Handle the 'login' API call success
        builder.addMatcher(
                api.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.token = payload.token;
                    state.user = payload.user;
                }
            );
 }
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;