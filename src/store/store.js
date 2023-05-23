import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './users/usersSlice';
import { apiSlice } from './apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), devTools: true
});

setupListeners(store.dispatch);