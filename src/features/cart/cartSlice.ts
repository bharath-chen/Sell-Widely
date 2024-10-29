import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../models/product";
import cryptoService from "../../services/crypto-service"; // Import the CryptoService

// Define CartProduct interface that extends Product and makes properties optional
export type CartProduct = Partial<Product> & {
  quantity?: number;
};

interface CartState {
  items: CartProduct[];
}

// Initialize state
const initialState: CartState = {
  items: [],
};

// Thunk to load cart items from local storage
export const loadCart = createAsyncThunk("cart/loadCart", async () => {
  try {
    const cartData = await cryptoService.getData("cartItems");
    return cartData || []; // Return the decrypted cart items or an empty array
  } catch (error) {
    console.error("Failed to load cart items:", error);
    return [];
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const existingProductIndex = state.items.findIndex(
        (item) =>
          item.product_id === action.payload.product_id &&
          item.product_measuring_unit_id ===
            action.payload.product_measuring_unit_id
      );
      if (existingProductIndex >= 0) {
        // If the product with the same measuring unit exists, increase its quantity
        state.items[existingProductIndex].quantity += action.payload.quantity;
      } else {
        // If the product with this measuring unit doesn't exist, add it as a new item
        state.items.push(action.payload);
      }
      // Save updated cart to local storage
      cryptoService.setData("cartItems", state.items);
    },
    addItemToCartWithQuantity: (
      state,
      action: PayloadAction<{ product: CartProduct; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingProductIndex = state.items.findIndex(
        (item) =>
          item.product_id === product.product_id &&
          item.product_measuring_unit_id === product.product_measuring_unit_id
      );

      if (existingProductIndex >= 0) {
        // If product with the same measuring unit exists, increase its quantity
        state.items[existingProductIndex].quantity += quantity;
      } else {
        // If product with a different measuring unit, add it as a new item
        state.items.push({
          ...product,
          quantity, // set the initial quantity for the new item
        });
      }
      // Save updated cart to local storage
      cryptoService.setData("cartItems", state.items);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        product_id: string;
        product_measuring_unit_id: string;
      }>
    ) => {
      // Remove the product by both product_id and product_measuring_unit_id
      state.items = state.items.filter(
        (item) =>
          item.product_id !== action.payload.product_id ||
          item.product_measuring_unit_id !==
            action.payload.product_measuring_unit_id
      );
      // Save updated cart to local storage
      cryptoService.setData("cartItems", state.items);
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{
        product_id: string;
        product_measuring_unit_id: string;
        quantity: number;
      }>
    ) => {
      const { product_id, product_measuring_unit_id, quantity } =
        action.payload;
      const existingProduct = state.items.find(
        (item) =>
          item.product_id === product_id &&
          item.product_measuring_unit_id === product_measuring_unit_id
      );
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
      // Save updated cart to local storage
      cryptoService.setData("cartItems", state.items);
    },
    clearCart: (state) => {
      // Clear all items in the cart
      state.items = [];
      // Save updated cart to local storage
      cryptoService.setData("cartItems", state.items);
    },
    setItems: (state, action: PayloadAction<CartProduct[]>) => {
      // Set items in the cart
      state.items = action.payload;
      // Save updated cart to local storage
      cryptoService.setData("cartItems", state.items);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      // Set items from loaded cart data
      state.items = action.payload;
    });
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  setItems,
  addItemToCartWithQuantity,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Selector to compute the total price based on both product_id and product_measuring_unit_id
export const selectCartTotal = (state: { cart: CartState }) => {
  return state.cart.items.reduce((total, item) => {
    const sellingPrice = parseFloat(item.selling_price || "0");
    return total + sellingPrice * (item.quantity || 0);
  }, 0);
};

// Selector to compute the total count of items considering measuring units
export const selectCartItemCount = (state: { cart: CartState }) => {
  return state.cart.items.reduce((count, item) => {
    return count + (item.quantity || 0);
  }, 0);
};
