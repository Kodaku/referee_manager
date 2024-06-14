export type SoccerCategoryInitialState = {
  currentCategory: SoccerCategory;
  soccerCategories: SoccerCategory[];
};

export type SoccerCategory = {
  category_name?: string;
  category_level?: string;
};

export type GetCategoriesResponse = {
  soccerCategories: SoccerCategory[];
};

export type SoccerCategoriesFilter = {
  categoryName: string;
  categoryLevel: string;
};
