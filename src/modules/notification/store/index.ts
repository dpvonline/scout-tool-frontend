import { defineStore } from "pinia";

import NotificationApi from "@/modules/notification/services/notification";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    _notifications: [],
    _isLoading: true,
    _notificationCount: {}
  }),

  actions: {
    async fetchNotifications(params = {}) {
      this._notifications = [];
      this._notificationCount = [];
      this._isLoading = true;
      try {
        const response = await NotificationApi.fetchAll(params);
        this._notifications = response.data;
        this._isLoading = false;
      } catch (error) {
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchNotificationCount(params = {}) {
      this._notificationCount = [];
      this._isLoading = true;
      try {
        const response = await NotificationApi.fetchCounts(params);
        this._notificationCount = response.data;
        this._isLoading = false;
      } catch (error) {
        console.log(error);
        this._isLoading = false;
      }
    },
  },
  getters: {
    notifications: (state) => {
      return state._notifications;
    },
    notificationCount: (state) => {
      return state._notificationCount;
    },
  },
});
