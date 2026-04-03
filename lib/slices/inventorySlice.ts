import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  quantity: number;
  costPrice: number;
  salePrice: number;
  warehouse: string;
  image?: string;
}

interface InventoryState {
  products: Product[];
  warehouses: string[];
  categories: string[];
}

const initialState: InventoryState = {
  products: [],
  warehouses: ['المخزن الرئيسي', 'محل 1', 'محل 2'],
  categories: ['ملابس رجالية', 'ملابس نسائية', 'ملابس أطفال', 'اكسسوارات'],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, setProducts } = inventorySlice.actions;
export default inventorySlice.reducer;
