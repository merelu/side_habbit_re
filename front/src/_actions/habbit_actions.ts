import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IHabbit, IValidationErrors } from "@typings/db";

interface ICreateHabbitBody {
  title: string;
  category: number;
  expiredDate: Date;
  schedule: boolean[];
}
interface ICreateHabbitResponse {
  success: boolean;
  habbit: IHabbit;
}
interface IGetHabbitResponse {
  success: boolean;
  habbits: IHabbit[];
}

export const createHabbit = createAsyncThunk<
  ICreateHabbitResponse,
  ICreateHabbitBody,
  {
    rejectValue: IValidationErrors;
  }
>("habbits/create", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post<ICreateHabbitResponse>(
      "/api/habbits/create",
      body,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    let error: AxiosError<IValidationErrors> = err;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(err.response.data);
  }
});

export const getTodayHabbits = createAsyncThunk<
  IGetHabbitResponse,
  void,
  {
    rejectValue: IValidationErrors;
  }
>("habbits/getTodayHabbits", async (date, { rejectWithValue }) => {
  try {
    const response = await axios.get<IGetHabbitResponse>(
      `/api/habbits/getTodayHabbits`,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    let error: AxiosError<IValidationErrors> = err;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(err.response.data);
  }
});
