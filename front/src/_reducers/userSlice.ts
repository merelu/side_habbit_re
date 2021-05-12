import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";
import { logInUser, logOutUser, registerUser } from "@_actions/user_action";

interface IUserState {
  isLoading: boolean;
  data: IUser | null;
  error: string | null | undefined;
}

const initialState: IUserState = {
  isLoading: false,
  data: null,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.error = null;
    });
    builder.addMatcher(
      (action) => {
        return action.type.includes("/pending");
      },
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      (action) => {
        return action.type.includes("/rejected");
      },
      (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
        state.isLoading = false;
      }
    );
  },
});
