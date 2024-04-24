import { Action, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import {
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
  URL,
} from "../../utils/http_constants";
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
      const response = await axios.post(`${URL}/${LOGIN_ENDPOINT}`, referee);

      const serverResponse = response.data as RefereeLoginResponse;

      if (serverResponse.token && serverResponse.referee) {
        sessionStorage.setItem("token", serverResponse.token);
      }

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
      const response = await axios.post(`${URL}/${SIGNUP_ENDPOINT}`, referee);

      const serverResponse = response.data as RefereeSignUpResponse;

      return serverResponse.referee;
    };

    const response = await signUp();
    console.log(response);
    if (response)
      dispatch(refereesActions.registerReferee({ referee: response }));
  };
};
