import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Supplier {
  id: string;
  name: string;
  type: 'أقمشة' | 'منتجات نهائية';
  phone: string;
  address: string;
  balance: number;
}

interface SuppliersState {
  suppliers: Supplier[];
}

const initialState: SuppliersState = {
  suppliers: [],
};

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    addSupplier: (state, action: PayloadAction<Supplier>) => {
      state.suppliers.push(action.payload);
    },
    updateSupplier: (state, action: PayloadAction<Supplier>) => {
      const index = state.suppliers.findIndex(s => s.id === action.payload.id);
      if (index >= 0) {
        state.suppliers[index] = action.payload;
      }
    },
    deleteSupplier: (state, action: PayloadAction<string>) => {
      state.suppliers = state.suppliers.filter(s => s.id !== action.payload);
    },
  },
});

export const { addSupplier, updateSupplier, deleteSupplier } = suppliersSlice.actions;
export default suppliersSlice.reducer;
