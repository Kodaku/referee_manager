import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SportSeason,
  SportSeasonInitialState,
} from "../../types/sport-season.types";

const initialState: SportSeasonInitialState = {
  currentSportSeason: {
    end_date: null,
    start_date: null,
    season_name: "",
  },
  sportSeasons: [],
};

const sportSeasonsSlice = createSlice({
  name: "sport_seasons",
  initialState: initialState,
  reducers: {
    getSportSeason(state, action: PayloadAction<{ sportSeason: SportSeason }>) {
      const sportSeason = action.payload.sportSeason;

      if (sportSeason) {
        state.currentSportSeason = sportSeason;
      }
    },
    replaceSportSeasons(
      state,
      action: PayloadAction<{ sportSeasons: SportSeason[] }>
    ) {
      const sportSeasons = action.payload.sportSeasons;

      if (sportSeasons) {
        state.sportSeasons = sportSeasons;
      }
    },
  },
});

const sportSeasonsActions = sportSeasonsSlice.actions;

export { sportSeasonsSlice, sportSeasonsActions };
