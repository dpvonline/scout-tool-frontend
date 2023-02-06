import { defineStore } from "pinia";

import DashboardApi from "@/modules/dashboard/services";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    _groupCount: 0,
    _userCount: 0,
    _openTaskCount: 0,
    _isLoading: true,
  }),

  actions: {
    async fetchGroupCount() {
      this._isLoading = true;
      try {
        const response = await DashboardApi.fetchGroupCount();
        this._groupCount = response.data.count;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchUserCount() {
      this._isLoading = true;
      try {
        const response = await DashboardApi.fetchUserCount();
        this._userCount = response.data.count;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchMyRequests() {
      this._isLoading = true;
      try {
        const response = await DashboardApi.fetchMyRequests();
        this._openTaskCount = response.data.filter(task => task.status === 'nothing').length;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
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
    isLoading: (state) => {
      return state._isLoading;
    },
  },
});
