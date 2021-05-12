import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";
import axios, { AxiosError } from "axios";
import { push } from "connected-react-router";

interface MyKnownError {
  errorMessage: string;
}

interface ILoginBodyData {
  email: string;
  password: string;
}
interface ILoginReturn {
  loginSuccess: boolean;
}

interface IRegisterBodyData {
  email: string;
  name: string;
  password: string;
}
interface IRegisterReturn {
  email: string;
}

export const logInUser = createAsyncThunk<
  ILoginReturn,
  ILoginBodyData,
  { rejectValue: MyKnownError }
>("users/login", async (body, thunkApi) => {
  try {
    const response = await axios.post("/api/users/login", body);
    thunkApi.dispatch(push("/"));
    return (await response.data) as ILoginReturn;
  } catch (err) {
    let error: AxiosError<MyKnownError> = err;
    if (!error.response) {
      throw err;
    }
    if (error.response.data.errorMessage) {
      return thunkApi.rejectWithValue(error.response.data);
    } else {
      throw err;
    }
  }
});

export const logOutUser = createAsyncThunk("users/logout", async () => {
  try {
    await axios.get("/api/users/logout");
  } catch (err) {
    let error: AxiosError<MyKnownError> = err;
    if (!error.response) {
      throw err;
    }
    if (error.response.data.errorMessage) {
      return error.response.data;
    } else {
      throw err;
    }
  }
});

export const registerUser = createAsyncThunk<
  IRegisterReturn,
  IRegisterBodyData,
  {
    rejectValue: MyKnownError;
  }
>("users/register", async (body, thunkApi) => {
  try {
    const response = await axios.post("/api/users/register", body);
    await thunkApi.dispatch(push("/login"));
    return (await response.data) as IRegisterReturn;
  } catch (err) {
    let error: AxiosError<MyKnownError> = err;
    if (!error.response) {
      throw err;
    }
    if (error.response.data.errorMessage) {
      return thunkApi.rejectWithValue(error.response.data);
    } else {
      throw err;
    }
  }
});

export const authUser = createAsyncThunk("users/auth", async (data) => {
  const response = await axios.get("/api/users/auth");
  return await response.data;
});
