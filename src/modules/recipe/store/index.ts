import { defineStore } from "pinia";

import RecipeApi from "@//modules/recipe/services/recipe.ts";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    _recipes: [],
    _recipeDetail: {},
  }),

  actions: {
    async fetchRecipes(params = {}) {
      try {
        const response = await RecipeApi.fetchAll(params);
        this._recipes = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchRecipeById(id: number) {
      try {
        const response = await RecipeApi.fetchById(id);
        this._recipeDetail = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    recipes: (state) => {
      return state._recipes;
    },
    recipesDetail: (state) => {
      return state._recipeDetail;
    },
  },
});
