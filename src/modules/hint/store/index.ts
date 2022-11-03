import { defineStore } from "pinia";

import IngredientApi from "@/modules/ingredient/services/ingredient";
import PortionsApi from "@/modules/ingredient/services/portion";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

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
    async createIngredient(data: object) {
      try {
        return await IngredientApi.create(data);
      } catch (error) {
        if (error.response.status === 400) {
          commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          commonStore.showError('Schwerer Server Fehler');
        }
      }
    },
    async updateIngredient(data: object) {
      try {
        return await IngredientApi.update(data);
      } catch (error) {
        if (error.response.status === 400) {
          commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          commonStore.showError('Schwerer Server Fehler');
        }
      }
    },
    async deleteIngredient(data: object) {
      try {
        return await IngredientApi.delete(data);
      } catch (error) {
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
