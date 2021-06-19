import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IHabbit, IValidationErrors } from "../typings/db";

interface ICreateHabbitBody {
  title: string;
  category: number;
  expiredDate: Date;
  writer: string;
  schedule: boolean[];
}
interface ICreateHabbitResponse {
  success: boolean;
  habbit: IHabbit;
}
interface IGetThisDayHabbit {
  userId: string;
  date: string;
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
    return await response.data;
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
  IGetThisDayHabbit,
  {
    rejectValue: IValidationErrors;
  }
>("habbits/getTodayHabbits", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get<IGetHabbitResponse>(
      `/api/habbits/getTodayHabbits/${data.userId}/${data.date}`,
      { withCredentials: true }
    );
    return await response.data;
  } catch (err) {
    let error: AxiosError<IValidationErrors> = err;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(err.response.data);
  }
});
