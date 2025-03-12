import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkWord = createAsyncThunk<string[], string>(
  "word/checkWord",
  async (word, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/word-check/${word}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        return rejectWithValue("Something went wrong, try again");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Network error, try again");
    }
  },
);

export const getWord = createAsyncThunk<string>(
  "word/getWord",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/word-of-the-day/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        return rejectWithValue("Something went wrong, try again");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Network error, try again");
    }
  },
);
