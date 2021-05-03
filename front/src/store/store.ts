import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import user_reducer from "@_reducers/user_reducer";

const reducer = combineReducers({
  user_reducer,
});

export const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({})],
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
