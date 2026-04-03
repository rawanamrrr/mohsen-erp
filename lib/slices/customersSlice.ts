import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  creditLimit: number;
  balance: number;
  type: 'نقدي' | 'آجل';
}

interface CustomersState {
  customers: Customer[];
}

const initialState: CustomersState = {
  customers: [
    {
      id: '1',
      name: 'عميل نقدي',
      phone: '',
      address: '',
      creditLimit: 0,
      balance: 0,
      type: 'نقدي',
    },
  ],
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index >= 0) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(c => c.id !== action.payload);
    },
  },
});

export const { addCustomer, updateCustomer, deleteCustomer } = customersSlice.actions;
export default customersSlice.reducer;
