import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { blogApi } from '../features/api/blogApi';
import userSlice from '../features/userSlice/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
  devTools: {
    stateSanitizer: (state) => (state.data ? { ...state, data: '<<LONG_BLOB>>' } : state),
  },
});

setupListeners(store.dispatch);
