import { defineStore } from "pinia";

import personApi from "@/modules/person/services/person";


export const usepersonStore = defineStore("person", {
  state: () => ({
    _persons: [],
  }),

  actions: {
    async fetchPersons(params = {}) {
      try {
        const response = await personApi.fetchAll(params);
        this._persons = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    persons: (state) => {
      return state._persons;
    },
  },
});
