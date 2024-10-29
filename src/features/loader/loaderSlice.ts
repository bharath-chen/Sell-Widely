import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";

export interface LoaderState {
  loading: boolean;
}

const initialState: LoaderState = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoader = (state: RootState) => state.loader.loading;

export default loaderSlice.reducer;
