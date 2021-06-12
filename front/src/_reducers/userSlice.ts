import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../typings/db";
import {
  authUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../_actions/user_actions";

interface IUserReducerState {
  isLoading: boolean;
  userData: IUser;
  register: string;
}

const initialState: IUserReducerState = {
  isLoading: false,
  userData: {},
  register: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.register = action.payload.email;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
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
