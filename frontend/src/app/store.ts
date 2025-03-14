import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./features/word/wordSlice";

export const store = configureStore({
  reducer: {
    word: wordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
