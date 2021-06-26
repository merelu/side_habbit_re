import { createSlice } from "@reduxjs/toolkit";
import { IHabbit } from "@typings/db";
import {
  addCommited,
  deleteCommited,
  getCommited,
} from "@_actions/commit_actions";

interface commitState {
  isLoading: boolean;
  commited: IHabbit[];
  error: string;
}

const initialState = {
  isLoading: false,
  commited: [],
  error: "",
} as commitState;

const commitSlice = createSlice({
  name: "commit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCommited.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commited = action.payload;
    });
    builder.addCase(addCommited.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commited = action.payload;
    });
    builder.addCase(deleteCommited.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commited = action.payload;
    });
    builder.addMatcher(
      (action) => {
        return (
          action.type.includes("/pending") && action.type.includes("commits")
        );
      },
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      (action) => {
        return (
          action.type.includes("/rejected") && action.type.includes("commits")
        );
      },
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default commitSlice.reducer;
