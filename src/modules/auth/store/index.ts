import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    _accessToken: '',
    _refreshToken: '',
    _user: {},
    _isAuth: false,
    _isAdmin: false
  }),

  actions: {
    login(route: string) {
      this._isAuth = true;
      this._user = {
        name: 'Robert'
      }
    },
    logout(route: string) {
      this._isAuth = false;
      this._user = {}
    },
  },

  getters: {
    accessToken: (state) => {
      return state._accessToken;
    },
    refreshToken: (state) => {
      return state._refreshToken;
    },
    user: (state) => {
      return state._user;
    },
    isAuth: (state) => {
      return state._isAuth;
    },
    isAdmin: (state) => {
      return state._isAdmin;
    },
  },
})
