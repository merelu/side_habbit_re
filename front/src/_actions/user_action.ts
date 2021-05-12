import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@typings/db";
import axios, { AxiosError } from "axios";
import { push } from "connected-react-router";

interface MyKnownError {
  errorMessage: string;
}

interface ILoginData {
  email: string;
  password: string;
}

interface IRegisterData {
  email: string;
  name: string;
  password: string;
}

export const logInUser = createAsyncThunk<
  IUser,
  ILoginData,
  { rejectValue: MyKnownError }
>("users/login", async (dataToSubmit, thunkApi) => {
  try {
    const response = await axios.post("/api/users/login", dataToSubmit);
    thunkApi.dispatch(push("/"));
    return (await response.data) as IUser;
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
  IUser,
  IRegisterData,
  {
    rejectValue: MyKnownError;
  }
>("users/register", async (dataToSubmit, thunkApi) => {
  try {
    const response = await axios.post<IUser>(
      "/api/users/register",
      dataToSubmit
    );
    await thunkApi.dispatch(push("/login"));
    return (await response.data) as IUser;
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
