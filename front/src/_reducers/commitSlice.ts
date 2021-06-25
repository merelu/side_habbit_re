import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { IHabbit } from "@typings/db";
import { addCommited, getCommited } from "@_actions/commit_actions";

interface commitState {
  commited: IHabbit[];
  error: SerializedError | null;
}

const initialState = {
  commited: [],
  error: null,
} as commitState;

const commitSlice = createSlice({
  name: "commit",
  initialState,
  reducers: {
    deleteCommitedItem(state, action: PayloadAction<string>) {
      state.commited = state.commited.filter(
        (item) => item._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommited.fulfilled, (state, action) => {
      state.commited = state.commited.concat(action.payload);
    });
    builder.addCase(getCommited.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(addCommited.fulfilled, (state, action) => {
      state.commited = action.payload;
    });
  },
});
export const { deleteCommitedItem } = commitSlice.actions;

export default commitSlice.reducer;
