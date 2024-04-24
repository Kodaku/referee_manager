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
  registrationOk: false,
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
    registerReferee(state, action: PayloadAction<{ referee: Referee }>) {
      const referee = action.payload.referee;

      if (referee) {
        state.registrationOk = true;
      }
    },
  },
});

const refereesActions = refereesSlice.actions;

export { refereesSlice, refereesActions };
