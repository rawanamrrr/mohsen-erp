import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InvoiceItem {
  productId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  date: string;
  customer: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'draft' | 'completed' | 'cancelled';
}

interface SalesState {
  invoices: Invoice[];
  currentCart: InvoiceItem[];
  currentCustomer: string;
}

const initialState: SalesState = {
  invoices: [],
  currentCart: [],
  currentCustomer: 'عميل نقدي',
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<InvoiceItem>) => {
      const existingItem = state.currentCart.find(
        item => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.total = existingItem.quantity * existingItem.price;
      } else {
        state.currentCart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.currentCart = state.currentCart.filter(
        item => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.currentCart = [];
    },
    setCustomer: (state, action: PayloadAction<string>) => {
      state.currentCustomer = action.payload;
    },
    createInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
      state.currentCart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCustomer, createInvoice } = 
  salesSlice.actions;
export default salesSlice.reducer;
