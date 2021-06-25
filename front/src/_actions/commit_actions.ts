import { createAsyncThunk } from "@reduxjs/toolkit";
import { IHabbit } from "@typings/db";

export const getCommited = createAsyncThunk(
  "commits/get",
  async (value, { rejectWithValue }) => {
    try {
      const response = await localStorage.getItem("commited");
      if (response === null) {
        throw new Error("저장된 commit이 없습니다.");
      } else {
        return JSON.parse(response) as IHabbit[];
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addCommited = createAsyncThunk(
  "commits/add",
  async (value: IHabbit[]) => {
    const response = await localStorage.getItem("commited");
    let parseResponse = [];
    if (response === null) {
      await localStorage.setItem("commited", JSON.stringify(value));
      return await value;
    }
    parseResponse = JSON.parse(response) as IHabbit[];
    parseResponse.concat(value);
    await localStorage.setItem("commited", JSON.stringify(parseResponse));
    return await parseResponse;
  }
);
