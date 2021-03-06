import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHabbit } from "@typings/db";
import { createHabbit, getTodayHabbits } from "@_actions/habbit_actions";

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
    handleAllChecked(
      state,
      action: PayloadAction<{ checked: boolean; category?: number }>
    ) {
      state.habbits = state.habbits.map((habbit) => {
        if (action.payload.category !== undefined) {
          return habbit.category === action.payload.category
            ? {
                ...habbit,
                checked: action.payload.checked,
              }
            : habbit;
        } else {
          return {
            ...habbit,
            checked: action.payload.checked,
          };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createHabbit.fulfilled, (state, action) => {
      state.isLoading = false;
      state.habbits = state.habbits.concat({
        ...action.payload.habbit,
        checked: false,
      });
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
        return (
          action.type.includes("/pending") && action.type.includes("habbit")
        );
      },
      (state, action) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      (action) => {
        return (
          action.type.includes("/rejected") && action.type.includes("habbit")
        );
      },
      (state, action) => {
        state.isLoading = false;
      }
    );
  },
});

export const { handleCheckedState, handleAllChecked } = habbitSlice.actions;
export default habbitSlice.reducer;
