import { configureStore } from "@reduxjs/toolkit";
import { refereesSlice } from "./slices/referees.slice";

export const store = configureStore({
  reducer: {
    referees: refereesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
