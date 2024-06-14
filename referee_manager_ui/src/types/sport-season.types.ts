export type SportSeasonInitialState = {
  currentSportSeason: SportSeason;
  sportSeasons: SportSeason[];
};

export type SportSeason = {
  season_name?: string;
  start_date?: Date | null;
  end_date?: Date | null;
};

export type GetSeasonsResponse = {
  sportSeasons: SportSeason[];
};

export type GetSportSeasonResponse = {
  currentSeason: SportSeason;
};

export type SportSeasonsFilter = {
  today: Date;
};
