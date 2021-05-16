import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { push } from "connected-react-router";

interface ILoginBodyData {
  email: string;
  password: string;
}

interface IRegisterBodyData {
  email: string;
  name: string;
  password: string;
}
interface IRegisterReturn {
  email: string;
}

export const logInUser = createAsyncThunk(
  "users/login",
  async (body: ILoginBodyData, thunkApi) => {
    const response = await axios.post("/api/users/login", body);
    thunkApi.dispatch(push("/"));
    return await response.data;
  }
);

export const logOutUser = createAsyncThunk("users/logout", async () => {
  const response = await axios.get("/api/users/logout");
  return response.data;
});

export const registerUser = createAsyncThunk<
  IRegisterReturn,
  IRegisterBodyData
>("users/register", async (body, thunkApi) => {
  const response = await axios.post("/api/users/register", body);
  await thunkApi.dispatch(push("/login"));
  return await response.data;
});

export const authUser = createAsyncThunk("users/auth", async () => {
  const response = await axios.get("/api/users/auth");
  return response.data;
});
