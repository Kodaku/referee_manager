import { Action, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import {
  FILTER_SOCCER_CATEGORIES_ENDPOINT,
  GET_SOCCER_CATEGORIES_ENDPOINT,
  URL,
} from "../../utils/http_constants";
import {
  GetCategoriesResponse,
  SoccerCategoriesFilter,
} from "../../types/soccer-category.types";
import { soccerCategoriesActions } from "../slices/soccer-category.slice";

export const getCategories = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action
> => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `${URL}/${GET_SOCCER_CATEGORIES_ENDPOINT}`
      );

      const serverResponse = response.data as GetCategoriesResponse;

      console.log(serverResponse);

      return serverResponse.soccerCategories;
    };

    const response = await fetchData();
    console.log(response);
    if (response)
      dispatch(
        soccerCategoriesActions.replaceCategories({
          soccerCategories: response,
        })
      );
  };
};

export const filterCategories = (
  filter: SoccerCategoriesFilter
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.post(
        `${URL}/${FILTER_SOCCER_CATEGORIES_ENDPOINT}`,
        filter
      );

      const serverResponse = response.data as GetCategoriesResponse;

      console.log(serverResponse);

      return serverResponse.soccerCategories;
    };

    const response = await fetchData();
    console.log(response);
    if (response)
      dispatch(
        soccerCategoriesActions.replaceCategories({
          soccerCategories: response,
        })
      );
  };
};
