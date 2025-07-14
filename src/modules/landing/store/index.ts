import { defineStore } from "pinia";

import FaqApi from "@/modules/landing/service/faq";
import PrivacyApi from "@/modules/landing/service/privacy";

export const useLandingStore = defineStore("landing", {
  state: () => ({
    _faqs: [],
    _privacys: [],
  }),

  actions: {
    async fetchFaqs() {
      try {
        const response = await FaqApi.fetchAll();
        this._faqs = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchPrivacys() {
      try {
        const response = await PrivacyApi.fetchAll();
        this._privacys = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    privacys: (state) => {
      return state._privacys;
    },
    faqs: (state) => {
      return state._faqs;
    },
  },
});
