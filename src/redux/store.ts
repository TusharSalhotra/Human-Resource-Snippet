import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import schedulingReducer from './slices/schedulingSlice';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    scheduling: schedulingReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;