import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../features/loader/loaderSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import modalReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
