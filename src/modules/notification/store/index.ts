import { defineStore } from "pinia";

import NotificationApi from "@/modules/notification/services/notification";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    _notifications: [],
    _notification: {},
    _isLoading: true,
    _notificationCount: {}
  }),

  actions: {
    async fetchNotifications(params = {}) {
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
    async fetchNotification(id: number) {
      this._notification = [];
      this._isLoading = true;
      try {
        const response = await NotificationApi.fetchById(id);
        this._notification = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
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
    async markAsRead(id: number) {
      try {
        return await NotificationApi.markAsRead(id);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async markAsUnread(id: number) {
      try {
        return await NotificationApi.markAsUnread(id);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    notifications: (state) => {
      return state._notifications;
    },
    notification: (state) => {
      return state._notification;
    },
    notificationCount: (state) => {
      return state._notificationCount;
    },
  },
});
