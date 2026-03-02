import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/newsSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});