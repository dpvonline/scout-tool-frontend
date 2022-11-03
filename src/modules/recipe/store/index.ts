import { defineStore } from "pinia";

import RecipeApi from "@//modules/recipe/services/recipe.ts";
import RecipeItemApi from "@//modules/recipe/services/recipe-item.ts";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    _recipes: [],
    _recipeDetail: {},
    _recipeItem: {},
    _createRecipeData: [{
      stepId: 1,
      name: '',
      description: '',
      mealType: ''
    }, {
      stepId: 2,
      recipeItems: [],
    }, {
      stepId: 3,
    }]
  }),

  actions: {
    addCreateRecipeData(step: number, data: object) {
      this._createRecipeData[step-1] = data;
    },
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
    async createRecipe(data: object) {
      try {
        return await RecipeApi.create(data);
      } catch (error) {
        if (error.response.status === 400) {
          commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          commonStore.showError("Schwerer Server Fehler");
        }
      }
    },
    async updateRecipe(data: object) {
      try {
        return await RecipeApi.update(data);
      } catch (error) {
        if (error.response.status === 400) {
          commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          commonStore.showError("Schwerer Server Fehler");
        }
      }
    },
    async deleteRecipe(data: object) {
      try {
        return await RecipeApi.delete(data);
      } catch (error) {}
    },
    //
    async fetchRecipeItemById(id: number) {
      try {
        const response = await RecipeItemApi.fetchById(id);
        this._recipeItem = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async createRecipeItem(data: object) {
      try {
        return await RecipeItemApi.create(data);
      } catch (error) {
        if (error.response.status === 400) {
          commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          commonStore.showError("Schwerer Server Fehler");
        }
      }
    },
    async updateRecipeItem(data: object) {
      try {
        return await RecipeItemApi.update(data);
      } catch (error) {
        if (error.response.status === 400) {
          commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          commonStore.showError("Schwerer Server Fehler");
        }
      }
    },
    async deleteRecipeItem(id: Number) {
      try {
        return await RecipeItemApi.delete(id);
      } catch (error) {}
    },
  },
  getters: {
    recipes: (state) => {
      return state._recipes;
    },
    recipeDetail: (state) => {
      return state._recipeDetail;
    },
    recipeItem: (state) => {
      return state._recipeItem;
    },
    createRecipeData: (state) => {
      return state._createRecipeData;
    },
  },
});
