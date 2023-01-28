import { defineStore } from "pinia";

import DashboardApi from "@/modules/dashboard/services";

export const useTaskStore = defineStore("task", {
  state: () => ({
    _myRequests: [],
    _myOwnRequests: [],
  }),

  actions: {
    async fetchMyRequests() {
      try {
        const response = await DashboardApi.fetchMyRequests();
        this._myRequests = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchMyOwnRequests() {
      try {
        const response = await DashboardApi.fetchMyOwnRequests();
        this._myOwnRequests = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    myRequests: (state) => {
      return state._myRequests;
    },
    myOwnRequests: (state) => {
      return state._myOwnRequests;
    },
  },
});
