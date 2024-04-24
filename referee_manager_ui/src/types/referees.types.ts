export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export type RefereeInitialState = {
  currentReferee: Referee;
};

export type Referee = {
  name: string;
  mechanographic_code: string;
  password: string;
  qualification: string;
  geneder: Gender;
};

export type RefereeLoginRequest = {
  mechanographic_code: string;
  password: string;
};

export type RefereeLoginResponse = {
  referee: Referee;
  token: string;
};

export type RefereeSignUpResponse = {
  referee: Referee;
};
