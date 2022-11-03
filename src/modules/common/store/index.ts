import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    _successMessage: 'Döner sind mega mega lecker',
    _successStatus: false,
    _errorMessage: 'Döner sind mega mega lecker',
    _errorStatus: false,
  }),

  actions: {
    async showSuccess(successMessage: string) {
      this._successMessage = successMessage
      this._successStatus = true

      setTimeout(() => {
        this._successStatus = false;
      }, 3000);
    },
    async hideSuccess(successMessage: string) {
      this._successStatus = false
    },
    async showError(errorMessage: string) {
      this._errorMessage = errorMessage
      this._errorStatus = true

      setTimeout(() => {
        this._errorStatus = false;
      }, 10000);
    },
    async hideError(errorMessage: string) {
      this._errorStatus = false
    },
  },
  getters: {
    successMessage: (state) => {
      return state._successMessage;
    },
    successStatus: (state) => {
      return state._successStatus;
    },
    errorMessage: (state) => {
      return state._errorMessage;
    },
    errorStatus: (state) => {
      return state._errorStatus;
    },
  },
});
