import { defineStore } from "pinia";

import IngredientApi from "@/modules/ingredient/services/ingredient";
import PortionsApi from "@/modules/ingredient/services/portion";

export const useIngredientStore = defineStore("ingredient", {
  state: () => ({
    _ingredients: [],
    _ingredientDetail: {},
    _portions: [],
  }),

  actions: {
    async fetchIngredients(params = {}) {
      try {
        const response = await IngredientApi.fetchAll(params);
        this._ingredients = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchIngredientById(id: number) {
      try {
        const response = await IngredientApi.fetchById(id);
        this._ingredientDetail = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchPortions(params = {}) {
      try {
        const response = await PortionsApi.fetchAll(params);
        this._portions = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    ingredients: (state) => {
      return state._ingredients;
    },
    ingredientDetail: (state) => {
      return state._ingredientDetail;
    },
    portions: (state) => {
      return state._portions;
    },
  },
});
