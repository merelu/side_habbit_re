import { createAsyncThunk } from "@reduxjs/toolkit";
import { IHabbit } from "@typings/db";

export const getCommited = createAsyncThunk(
  "commits/get",
  async (value, { rejectWithValue }) => {
    const response = await localStorage.getItem("commited");
    if (response === null) {
      return rejectWithValue("commit된 습관이 없습니다.");
    } else {
      return JSON.parse(response) as IHabbit[];
    }
  }
);

export const addCommited = createAsyncThunk<IHabbit[], IHabbit[]>(
  "commits/add",
  async (commited: IHabbit[], { rejectWithValue }) => {
    if (commited.length === 0) {
      return rejectWithValue("commit된 습관이 없습니다.");
    }
    const response = localStorage.getItem("commited");
    let parseResponse: IHabbit[] = [];
    if (response === null) {
      localStorage.setItem("commited", JSON.stringify(commited));
      return commited;
    }
    parseResponse = JSON.parse(response) as IHabbit[];
    commited.forEach((commit) => {
      if (parseResponse.findIndex((item) => item._id === commit._id) < 0) {
        parseResponse.push(commit);
      }
    });
    localStorage.setItem("commited", JSON.stringify(parseResponse));
    return parseResponse;
  }
);

export const deleteCommited = createAsyncThunk<IHabbit[], string>(
  "commits/delete",
  async (id, { rejectWithValue }) => {
    const response = localStorage.getItem("commited") as string;
    let parseResponse: IHabbit[] = [];
    parseResponse = JSON.parse(response) as IHabbit[];
    parseResponse = parseResponse.filter((item) => item._id !== id);
    localStorage.setItem("commited", JSON.stringify(parseResponse));
    return parseResponse;
  }
);
