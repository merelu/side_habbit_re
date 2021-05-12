import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";
import {
  authUser,
  logInUser,
  logOutUser,
  registerUser,
} from "@_actions/user_action";

interface IUserState {
  isLoading: boolean;
  userData: IUser | null;
  register: string | null;
  error: string | null | undefined;
}

const initialState: IUserState = {
  isLoading: false,
  userData: null,
  register: null,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.register = action.payload.email;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = null;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload.data;
    });
    builder.addMatcher(
      (action) => {
        return action.type.includes("/pending");
      },
      (state, action) => {
        state.isLoading = true;
        state.error = null;
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
