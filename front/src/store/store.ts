import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import alertSlice from "@_reducers/alertSlice";
import habbitSlice from "@_reducers/habbitSlice";
import userSlice from "@_reducers/userSlice";

export const history = createBrowserHistory();

const reducer = combineReducers({
  router: connectRouter(history),
  user: userSlice,
  habbit: habbitSlice,
  alert: alertSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(routerMiddleware(history)),
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
