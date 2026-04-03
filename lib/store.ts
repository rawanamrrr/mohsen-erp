import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import inventoryReducer from './slices/inventorySlice';
import salesReducer from './slices/salesSlice';
import customersReducer from './slices/customersSlice';
import suppliersReducer from './slices/suppliersSlice';
import financialReducer from './slices/financialSlice';
import hrReducer from './slices/hrSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
    sales: salesReducer,
    customers: customersReducer,
    suppliers: suppliersReducer,
    financial: financialReducer,
    hr: hrReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
