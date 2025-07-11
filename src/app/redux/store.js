import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../redux/slice/themeSlice';
import photographerReducer from '../redux/slice/photographerSlice'
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    photographers:photographerReducer,
  },
});