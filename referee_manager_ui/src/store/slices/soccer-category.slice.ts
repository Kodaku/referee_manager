import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SoccerCategory,
  SoccerCategoryInitialState,
} from "../../types/soccer-category.types";

const initialState: SoccerCategoryInitialState = {
  currentCategory: {
    category_level: "",
    category_name: "",
  },
  soccerCategories: [],
};

const soccerCategoriesSlice = createSlice({
  name: "soocer_categories",
  initialState: initialState,
  reducers: {
    getCategory(
      state,
      action: PayloadAction<{ soccerCategory: SoccerCategory }>
    ) {
      const soccerCategory = action.payload.soccerCategory;

      if (soccerCategory) {
        state.currentCategory = soccerCategory;
      }
    },
    replaceCategories(
      state,
      action: PayloadAction<{ soccerCategories: SoccerCategory[] }>
    ) {
      const soccerCategories = action.payload.soccerCategories;

      if (soccerCategories) {
        state.soccerCategories = soccerCategories;
      }
    },
  },
});

const soccerCategoriesActions = soccerCategoriesSlice.actions;

export { soccerCategoriesSlice, soccerCategoriesActions };
