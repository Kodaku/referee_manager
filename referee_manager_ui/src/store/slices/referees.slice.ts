import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Gender,
  Referee,
  RefereeInitialState,
} from "../../types/referees.types";

const initialState: RefereeInitialState = {
  currentReferee: {
    geneder: Gender.MALE,
    mechanographic_code: "",
    name: "",
    password: "",
    qualification: "",
  },
};

const refereesSlice = createSlice({
  name: "referees",
  initialState: initialState,
  reducers: {
    getReferee(state, action: PayloadAction<{ referee: Referee }>) {
      const referee = action.payload.referee;

      if (referee) {
        state.currentReferee = referee;
      }
    },
  },
});

const refereesActions = refereesSlice.actions;

export { refereesSlice, refereesActions };
