import { Action, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import {
  FILTER_SOCCER_CATEGORIES_ENDPOINT,
  GET_CURRENT_SPORT_SEASON_ENDPOINT,
  GET_SOCCER_CATEGORIES_ENDPOINT,
  GET_SPORT_SEASONS_ENDPOINT,
  URL,
} from "../../utils/http_constants";
import {
  GetCategoriesResponse,
  SoccerCategoriesFilter,
} from "../../types/soccer-category.types";
import { soccerCategoriesActions } from "../slices/soccer-category.slice";
import {
  GetSeasonsResponse,
  GetSportSeasonResponse,
  SportSeasonsFilter,
} from "../../types/sport-season.types";
import { sportSeasonsActions } from "../slices/sport-season.slice";

export const getSeasons = (): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(`${URL}/${GET_SPORT_SEASONS_ENDPOINT}`);

      const serverResponse = response.data as GetSeasonsResponse;

      console.log(serverResponse);

      return serverResponse.sportSeasons;
    };

    const response = await fetchData();
    console.log(response);
    if (response)
      dispatch(
        sportSeasonsActions.replaceSportSeasons({
          sportSeasons: response,
        })
      );
  };
};

export const getCurrentSportSeason = (
  filter: SportSeasonsFilter
): ThunkAction<void, RootState, unknown, Action> => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.post(
        `${URL}/${GET_CURRENT_SPORT_SEASON_ENDPOINT}`,
        filter,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const serverResponse = response.data as GetSportSeasonResponse;

      console.log(serverResponse);

      return serverResponse.currentSeason;
    };

    const response = await fetchData();
    console.log(response);
    if (response)
      dispatch(
        sportSeasonsActions.getSportSeason({
          sportSeason: response,
        })
      );
  };
};
