import { createSlice } from '@reduxjs/toolkit';
import api from './api';

function storeToken(state, { payload }) {
    state.token = payload.token;
    window.sessionStorage.setItem("token", payload.token);
}
// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth",
    initialState: { token: window.sessionStorage.getItem("token") ?? null },
    reducers: {
        logout: (_state) => ({ token: null, user: null })
    },

    // Handle the 'register' API call success
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.register.matchFulfilled, storeToken);
        // Handle the 'login' API call success
        builder.addMatcher(
            api.endpoints.login.matchFulfilled, storeToken);
    }
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;