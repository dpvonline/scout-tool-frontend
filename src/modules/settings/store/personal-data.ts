import { defineStore } from "pinia";

import PersonalDataApi from "@/modules/settings/services/personal-data";

export const usePersonalDataStore = defineStore("personal-data", {
  state: () => ({
    _personalData: {},
  }),

  actions: {
    async fetchPersonalData(params = {}) {
      try {
        const response = await PersonalDataApi.fetchAll(params);
        this._personalData = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async updatePersonalData(data: object) {
      try {
        return await PersonalDataApi.update(data);
      } catch (error) {
        if (error.response.status === 400) {
        } else if (error.response.status === 500) {
        }
      }
    },
  },
  getters: {
    personalData: (state) => {
      return state._personalData;
    },
  },
});
