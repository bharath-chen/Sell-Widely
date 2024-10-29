import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";
import { AuthState } from "../../models/authState";
import cryptoService from "../../services/crypto-service";

// Define the initial state for authentication
const initialState: AuthState = {
  customer_id: "",
  first_name: "",
  last_name: "",
  email: "",
  mobilenumber: "",
  registration_type: "",
  status: "",
  otp_status: "",
  created_date: null,
  modified_date: "",
};

// Function to load and decrypt the authentication state from local storage
const loadAuthState = async (): Promise<AuthState> => {
  const data = await cryptoService.getData("authState");
  return data || initialState; // Return loaded state or initial state
};

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialState, // Start with initial state
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      // Update state with provided auth info
      state.customer_id = action.payload.customer_id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.mobilenumber = action.payload.mobilenumber;
      state.registration_type = action.payload.registration_type;
      state.status = action.payload.status;
      state.otp_status = action.payload.otp_status;
      state.created_date = action.payload.created_date;
      state.modified_date = action.payload.modified_date;

      // Encrypt and save auth state to local storage
      cryptoService.setData("authState", state);
    },
    logout(state) {
      // Reset state to initial values
      state.customer_id = "";
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.mobilenumber = "";
      state.registration_type = "";
      state.status = "";
      state.otp_status = "";
      state.created_date = null;
      state.modified_date = "";

      // Remove auth state from local storage
      cryptoService.removeData("authState"); // Use the removeData method from cryptoService
    },
  },
});

// Load the initial auth state and set it in the store
export const initializeAuthState = () => async (dispatch) => {
  const authState = await loadAuthState();
  dispatch(authSlice.actions.login(authState)); // Dispatch login with loaded state
};

// Export actions
export const { login, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// Selectors to access auth state
export const selectAuthInfo = (state: RootState): AuthState => state.auth;

export const selectIsLoggedIn = (state: RootState): boolean => {
  return !!state.auth.customer_id && !!state.auth.email;
};
