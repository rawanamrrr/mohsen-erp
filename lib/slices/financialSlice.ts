import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  date: string;
  type: 'إيداع' | 'سحب' | 'تحويل';
  amount: number;
  description: string;
  account: string;
}

interface FinancialState {
  cashboxes: { name: string; balance: number }[];
  transactions: Transaction[];
}

const initialState: FinancialState = {
  cashboxes: [
    { name: 'الخزينة الرئيسية', balance: 0 },
    { name: 'خزينة المحل 1', balance: 0 },
    { name: 'خزينة المحل 2', balance: 0 },
  ],
  transactions: [],
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateCashbox: (state, action: PayloadAction<{ name: string; balance: number }>) => {
      const cashbox = state.cashboxes.find(c => c.name === action.payload.name);
      if (cashbox) {
        cashbox.balance = action.payload.balance;
      }
    },
  },
});

export const { addTransaction, updateCashbox } = financialSlice.actions;
export default financialSlice.reducer;
