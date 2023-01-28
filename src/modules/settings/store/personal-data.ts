import { defineStore } from "pinia";

import PersonalDataApi from "@/modules/settings/services/personal-data";

import { useCommonStore } from "@/modules/common/store/index.ts";
const commonStore = useCommonStore();

export const usePersonalDataStore = defineStore("personal-data", {
  state: () => ({
    _personalData: {},
  }),

  actions: {
    async fetchPersonalData(params = {}) {
      try {
        const response = await PersonalDataApi.fetchAll(params);
        this._personalData = response.data;
        console.log(response.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async updatePersonalData(data: object) {
      try {
        return await PersonalDataApi.update(data);
      } catch (error) {
        if (error.response.status === 400) {
          commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          commonStore.showError('Schwerer Server Fehler');
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
