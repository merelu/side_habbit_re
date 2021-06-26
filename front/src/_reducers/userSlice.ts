import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";
import {
  authUser,
  loginUser,
  logoutUser,
  registerUser,
} from "@_actions/user_actions";

interface IUserReducerState {
  isLoading: boolean;
  userData: IUser | null;
}

const initialState: IUserReducerState = {
  isLoading: false,
  userData: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload.user;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = null;
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload.user;
    });
    builder.addMatcher(
      (action) => {
        return (
          action.type.includes("/pending") && action.type.includes("users")
        );
      },
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      (action) => {
        return (
          action.type.includes("/rejected") && action.type.includes("users")
        );
      },
      (state, action) => {
        state.isLoading = false;
      }
    );
  },
});

export default userSlice.reducer;
