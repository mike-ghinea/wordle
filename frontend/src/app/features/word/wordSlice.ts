import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { checkWord, getWord } from "./thunks";

export interface WordState {
  grid: string[];
  answerGrid: string[][];
  row: number;
  disabledLetters: string[];
  correctLetters: string[];
  wrongLocationLetters: string[];
  error: string | null;
  word: string | null;
}

const initialState: WordState = {
  grid: ["", "", "", "", "", ""],
  answerGrid: [[], [], [], [], [], []],
  row: 0,
  disabledLetters: [],
  correctLetters: [],
  wrongLocationLetters: [],
  error: null,
  word: null,
};

export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    addLetter: (state, action: PayloadAction<string>) => {
      state.grid[state.row] = state.grid[state.row] + action.payload;
    },
    removeLetter: (state) => {
      state.grid[state.row] = state.grid[state.row].slice(
        0,
        state.grid[state.row].length - 1,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkWord.pending, (state) => {
        state.error = null;
      })
      .addCase(
        checkWord.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.answerGrid[state.row] = action.payload;
          action.payload.forEach((status, index) => {
            if (status === "g")
              state.correctLetters.push(state.grid[state.row][index]);
            else if (status === "y")
              state.wrongLocationLetters.push(state.grid[state.row][index]);
            else if (status === "r")
              state.disabledLetters.push(state.grid[state.row][index]);
          });
          state.row++;
        },
      )
      .addCase(checkWord.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = "Something went wrong.";
        }
      })
      .addCase(getWord.pending, (state) => {
        state.error = null;
      })
      .addCase(getWord.fulfilled, (state, action: PayloadAction<string>) => {
        state.word = action.payload;
      })
      .addCase(getWord.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = "Something went wrong.";
        }
      });
  },
});

export const { addLetter, removeLetter } = wordSlice.actions;

export default wordSlice.reducer;
