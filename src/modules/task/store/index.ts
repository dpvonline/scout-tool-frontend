import { defineStore } from "pinia";

import DashboardApi from "@/modules/dashboard/services";

export const useTaskStore = defineStore("task", {
  state: () => ({
    _myRequests: [],
    _myOwnRequests: [],
    _task: {},
    _isLoading: true,
  }),

  actions: {
    async fetchMyRequests() {
      this._myRequests = [];
      this._isLoading = true;
      try {
        const response = await DashboardApi.fetchMyRequests();
        this._myRequests = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchMyOwnRequests() {
      this._myOwnRequests = [];
      this._isLoading = true;
      try {
        const response = await DashboardApi.fetchMyOwnRequests();
        this._myOwnRequests = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
  },
  getters: {
    myRequests: (state) => {
      return state._myRequests;
    },
    myRequestsCount: (state) => {
      return state._myRequests.length;
    },
    myOwnRequests: (state) => {
      return state._myOwnRequests;
    },
    task: (state) => {
      return state._task
    },
    isLoading: (state) => {
      return state._isLoading
    }
  },
});
