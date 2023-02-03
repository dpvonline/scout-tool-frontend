import { defineStore } from "pinia";

import DashboardApi from "@/modules/dashboard/services";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    _groupCount: -1,
    _userCount: -1,
    _openTaskCount: -1,
  }),

  actions: {
    async fetchGroupCount() {
      try {
        const response = await DashboardApi.fetchGroupCount();
        this._groupCount = response.data.count;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchUserCount() {
      try {
        const response = await DashboardApi.fetchUserCount();
        this._userCount = response.data.count;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchMyRequests() {
      try {
        const response = await DashboardApi.fetchMyRequests();
        this._openTaskCount = response.data.filter(task => task.status === 'nothing').length;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    groupCount: (state) => {
      return state._groupCount;
    },
    userCount: (state) => {
      return state._userCount;
    },
    openTaskCount: (state) => {
      return state._openTaskCount;
    },
  },
});
