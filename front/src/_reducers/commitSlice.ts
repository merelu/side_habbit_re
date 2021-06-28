import { createSlice } from "@reduxjs/toolkit";
import { ICommit } from "@typings/db";
import {
  addCommited,
  deleteCommited,
  getCommited,
  getTodayPushed,
  pushCommited,
} from "@_actions/commit_actions";

interface commitState {
  isLoading: boolean;
  commited: ICommit[];
  pushed: ICommit[];
  error: string;
}

const initialState = {
  isLoading: false,
  commited: [],
  pushed: [],
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
    builder.addCase(pushCommited.fulfilled, (state, action) => {
      state.isLoading = false;
      state.commited = [];
    });
    builder.addCase(getTodayPushed.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pushed = action.payload.pushed.map((item) => ({
        ...item,
        habbitId: item.habbitId._id,
        title: item.habbitId.title,
        category: item.habbitId.category,
      }));
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
