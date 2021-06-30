import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommit } from "@typings/db";
import {
  addCommited,
  deleteCommited,
  getCommited,
  getPushedWithinRange,
  pushCommited,
} from "@_actions/commit_actions";
import dayjs from "dayjs";

interface commitState {
  isLoading: boolean;
  commited: ICommit[];
  pushed: ICommit[];
  pushedAll: ICommit[];
  error: string;
}

const initialState = {
  isLoading: false,
  commited: [],
  pushed: [],
  pushedAll: [],
  error: "",
} as commitState;

const commitSlice = createSlice({
  name: "commit",
  initialState,
  reducers: {
    getPushed(state, action: PayloadAction<string>) {
      state.pushed = state.pushedAll.filter((pushed) =>
        dayjs(pushed.createAt).isSame(action.payload, "day")
      );
    },
  },
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
    builder.addCase(getPushedWithinRange.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pushedAll = action.payload.pushedAll.map((item) => ({
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
export const { getPushed } = commitSlice.actions;
export default commitSlice.reducer;
