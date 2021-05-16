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
  userData: IUser;
  register: string;
}

const initialState: IUserState = {
  isLoading: false,
  userData: {},
  register: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.register = action.payload.email;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = {};
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
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
        state.isLoading = false;
      }
    );
  },
});
