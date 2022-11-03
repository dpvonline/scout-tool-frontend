import { defineStore } from 'pinia'

export const useNavStore = defineStore('navStore', {
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
