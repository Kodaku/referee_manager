import { configureStore } from "@reduxjs/toolkit";
import { refereesSlice } from "./slices/referees.slice";
import { soccerCategoriesSlice } from "./slices/soccer-category.slice";
import { sportSeasonsSlice } from "./slices/sport-season.slice";

export const store = configureStore({
  reducer: {
    referees: refereesSlice.reducer,
    soccerCategories: soccerCategoriesSlice.reducer,
    sportSeasons: sportSeasonsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
