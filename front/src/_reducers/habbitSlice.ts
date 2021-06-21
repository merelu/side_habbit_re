import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHabbit } from "../typings/db";
import { createHabbit, getTodayHabbits } from "../_actions/habbit_actions";

interface IHabbitReducerState {
  isLoading: boolean;
  habbits: IHabbit[];
}

const initialState: IHabbitReducerState = {
  isLoading: false,
  habbits: [],
};

const habbitSlice = createSlice({
  name: "habbit",
  initialState,
  reducers: {
    handleCheckedState(state, action: PayloadAction<string>) {
      state.habbits = state.habbits.map((habbit) =>
        habbit._id === action.payload
          ? { ...habbit, checked: !habbit.checked }
          : habbit
      );
    },
    allChecked(state) {
      state.habbits = state.habbits.map((habbit) => ({
        ...habbit,
        checked: !habbit.checked,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createHabbit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.habbits.concat(action.payload.habbit);
    });
    builder.addCase(getTodayHabbits.fulfilled, (state, action) => {
      state.isLoading = false;
      state.habbits = action.payload.habbits.map((habbit) => ({
        ...habbit,
        checked: false,
      }));
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

export const { handleCheckedState, allChecked } = habbitSlice.actions;
export default habbitSlice.reducer;
