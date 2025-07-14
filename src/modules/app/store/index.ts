import { defineStore } from 'pinia'

import { useDashboardStore } from "@/modules/dashboard/store/index.ts";

export const useAppStore = defineStore('appStore', {
  state: () => ({
    _currentRoute: 'home'
  }),

  actions: {
    setCurrentRoute(route: string) {
      this._currentRoute = route;
    },
  },

  getters: {
    currentRoute: (state) => {
      return state._currentRoute;
    },
  },
})
