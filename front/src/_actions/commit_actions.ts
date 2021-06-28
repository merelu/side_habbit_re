import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICommit, IHabbit, IPushed, IValidationErrors } from "@typings/db";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";

export interface IPushCommitedBody {
  writer: string;
  habbitId: string;
  createAt: Date;
}

interface IDeleteCommitedBody {
  habbitId: string;
  userId: string;
}

interface IPushResponse {
  success: boolean;
  pushed: IPushed[];
}

interface IAddCommitBody {
  commited: IHabbit[];
  userId: string;
}

export const getCommited = createAsyncThunk(
  "commits/get",
  async (userId: string, { rejectWithValue }) => {
    const response = await localStorage.getItem(`${userId}-commited`);
    if (response === null) {
      return rejectWithValue(
        "관리할 commit이 없습니다. 새 commit 하기위해 수행하신 습관을 선택해주세요"
      );
    } else {
      return JSON.parse(response) as ICommit[];
    }
  }
);

export const addCommited = createAsyncThunk<
  ICommit[],
  IAddCommitBody,
  { rejectValue: string }
>("commits/add", async (body, { rejectWithValue }) => {
  const commited: ICommit[] = body.commited.map((commit) => ({
    writer: body.userId,
    habbitId: commit._id,
    title: commit.title,
    category: commit.category,
    createAt: dayjs().toJSON(),
  }));

  if (body.commited.length === 0) {
    return rejectWithValue("commit된 습관이 없습니다.");
  }

  const response = localStorage.getItem(`${body.userId}-commited`);

  let parseResponse: ICommit[] = [];

  if (response === null) {
    localStorage.setItem(`${body.userId}-commited`, JSON.stringify(commited));
    return commited;
  }

  parseResponse = JSON.parse(response) as ICommit[];

  commited.forEach((commit) => {
    if (
      parseResponse.findIndex((item) => item.habbitId === commit.habbitId) < 0
    ) {
      parseResponse.push(commit);
    }
  });
  localStorage.setItem(
    `${body.userId}-commited`,
    JSON.stringify(parseResponse)
  );
  return parseResponse;
});

export const deleteCommited = createAsyncThunk<
  ICommit[],
  IDeleteCommitedBody,
  { rejectValue: string }
>("commits/delete", async (body, { rejectWithValue }) => {
  const response = localStorage.getItem(`${body.userId}-commited`);
  if (response === null) {
    return rejectWithValue("제거될 commited가 없습니다.");
  }
  let parseResponse: ICommit[] = [];
  parseResponse = JSON.parse(response) as ICommit[];
  parseResponse = parseResponse.filter(
    (item) => item.habbitId !== body.habbitId
  );
  localStorage.setItem(
    `${body.userId}-commited`,
    JSON.stringify(parseResponse)
  );
  return parseResponse;
});

export const pushCommited = createAsyncThunk<
  IPushResponse,
  IPushCommitedBody[],
  {
    rejectValue: IValidationErrors;
  }
>("commits/push", async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post<IPushResponse>(
      "/api/commits/pushCommited",
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

export const getTodayPushed = createAsyncThunk<
  IPushResponse,
  string,
  {
    rejectValue: IValidationErrors;
  }
>("commits/getTodayPushed", async (date, { rejectWithValue }) => {
  try {
    const response = await axios.get<IPushResponse>(
      `/api/commits/getTodayPushed/${date}`,
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
