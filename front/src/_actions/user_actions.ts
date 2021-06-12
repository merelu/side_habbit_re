import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "users/login",
  async (body, thunkApi) => {
    try {
      const response = await axios.post("/api/users/login", body);
      return await response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const response = await axios.get("/api/users/logout");
  return await response.data;
});

export const registerUser = createAsyncThunk(
  "users/auth",
  async (body, thunkApi) => {
    try {
      const response = await axios.post("/api/users/register", body);
      return await response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const authUser = createAsyncThunk("users/auth", async () => {
  const response = await axios.get("/api/users/auth");
  return await response.data;
});
