import { configureStore } from '@reduxjs/toolkit';
// reducer?
// import api from './api';
// import counterSlice from './counterSlice';

const store = configureStore({
  reducer: {
    // [api.reducerPath]: api.reducer,
    // authorization: counterSlice,
  },

  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(api.middleware);
  // },
});

export default store;