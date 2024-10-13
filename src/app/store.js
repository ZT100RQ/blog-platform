import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { blogApi } from '../features/api/blogApi';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
  devTools: {
    stateSanitizer: (state) => (state.data ? { ...state, data: '<<LONG_BLOB>>' } : state),
  },
});

setupListeners(store.dispatch);
