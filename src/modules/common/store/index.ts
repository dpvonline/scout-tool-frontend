import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    _successMessage: 'Döner sind mega mega lecker',
    _successStatus: false,

    _errorMessage: 'Döner sind mega mega lecker',
    _errorStatus: false,

    _bannerStatus: true,
    _bannerHeader: 'Hypercare-Phase vom Anmelde-Tool',
    _bannerMesasge: 'Fragen zur Anmeldung jederzeit per WhatsApp / Signal oder Telegram an 0176 5676 2746 oder robertbagdahn@gmail.com'
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
    async hideBanner() {
      this._bannerStatus = false
    },
  },
  getters: {
    successMessage: (state) => {
      return state._successMessage;
    },
    successStatus: (state) => {
      return state._successStatus;
    },
    bannerStatus: (state) => {
      return state._bannerStatus;
    },
    bannerMesasge: (state) => {
      return state._bannerMesasge;
    },
    bannerHeader: (state) => {
      return state._bannerHeader;
    },
    errorMessage: (state) => {
      return state._errorMessage;
    },
    errorStatus: (state) => {
      return state._errorStatus;
    },
  },
});
