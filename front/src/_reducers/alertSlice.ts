import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface errorState {
  open: boolean;
  error: boolean;
  message: string;
}
const initialState = {
  open: false,
  error: false,
  message: "",
} as errorState;

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    occurError(state, action: PayloadAction<string>) {
      state.open = true;
      state.error = true;
      state.message = action.payload;
    },
    occur(state, action: PayloadAction<string>) {
      state.open = true;
      state.error = false;
      state.message = action.payload;
    },
    alertClose(state) {
      state.open = false;
      state.error = false;
      state.message = "";
    },
  },
});

export const { occurError, occur, alertClose } = alertSlice.actions;
export default alertSlice.reducer;
