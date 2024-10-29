import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isVisible: boolean;
  type: "success" | "error" | "info";
  message: string;
}

const initialState: ModalState = {
  isVisible: false,
  type: "info",
  message: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (
      state,
      action: PayloadAction<{
        type: "success" | "error" | "info";
        message: string;
      }>
    ) => {
      state.isVisible = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideModal: (state) => {
      state.isVisible = false;
      state.type = "info";
      state.message = "";
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
