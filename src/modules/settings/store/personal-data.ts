import { defineStore } from "pinia";

import personalDataApi from "@/modules/settings/services/personal-data";

export const usePersonalDataStore = defineStore("personal-data", {
  state: () => ({
    _personalData: {},
    _tribeIsVerified: {
      status: "",
      verified: false,
    },
  }),

  actions: {
    async fetchPersonalData(params = {}) {
      try {
        const response = await personalDataApi.fetchAll(params);
        this._personalData = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async updatePersonalData(data: object) {
      try {
        return await personalDataApi.update(data);
      } catch (error) {
        if (error.response.status === 400) {
        } else if (error.response.status === 500) {
        }
      }
    },
    async fetchMyTribeIsVerified() {
      try {
        const response = await personalDataApi.fetchTribeIsVerified();
        this._tribeIsVerified = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    personalData: (state) => {
      return state._personalData;
    },
    tribeIsVerified: (state) => {
      return state._tribeIsVerified;
    },
  },
});
