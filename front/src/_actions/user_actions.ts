import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUser, IValidationErrors } from "@typings/db";

interface ILoginBody {
  email: string;
  password: string;
}
interface IRegisterBody {
  email: string;
  name: string;
  password: string;
}

interface IUserResponse {
  success: boolean;
  user: IUser;
}
interface IRegisterResponse {
  success: boolean;
}

export const loginUser = createAsyncThunk<
  IUserResponse,
  ILoginBody,
  {
    rejectValue: IValidationErrors;
  }
>("users/login", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post<IUserResponse>("/api/users/login", body, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    let error: AxiosError<IValidationErrors> = err;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk("users/logout", async () => {
  const response = await axios.get("/api/users/logout");
  return await response.data;
});

export const registerUser = createAsyncThunk<
  IRegisterResponse,
  IRegisterBody,
  { rejectValue: IValidationErrors }
>("users/register", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post<IRegisterResponse>(
      "/api/users/register",
      body,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    let error: AxiosError<IValidationErrors> = err;
    if (!error.response) throw err;
    return rejectWithValue(error.response.data);
  }
});

export const authUser = createAsyncThunk<
  IUserResponse,
  void,
  { rejectValue: IValidationErrors }
>("users/auth", async (value, { rejectWithValue }) => {
  try {
    const response = await axios.get<IUserResponse>("/api/users/auth", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    let error: AxiosError<IValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
