import { Action, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { URL } from "../../utils/http_constants";
import {
  Referee,
  RefereeLoginRequest,
  RefereeLoginResponse,
  RefereeSignUpResponse,
} from "../../types/referees.types";
import { refereesActions } from "../slices/referees.slice";

export const loginReferee = (
  referee: RefereeLoginRequest
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch) => {
    const login = async () => {
      const response = await axios.post(`${URL}/login`, referee);

      const serverResponse = response.data as RefereeLoginResponse;

      return serverResponse.referee;
    };

    const response = await login();
    console.log(response);
    if (response) dispatch(refereesActions.getReferee({ referee: response }));
  };
};

export const registerReferee = (
  referee: Referee
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch) => {
    const signUp = async () => {
      const response = await axios.post(`${URL}/signup`, referee);

      const serverResponse = response.data as RefereeSignUpResponse;

      return serverResponse.referee;
    };

    const response = await signUp();
    console.log(response);
    if (response) dispatch(refereesActions.getReferee({ referee: response }));
  };
};
