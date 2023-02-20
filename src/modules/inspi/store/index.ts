import { defineStore } from "pinia";

import ActivitiesOfTheWeek from "@/modules/inspi/services/activity-of-the-week";

export const useInspiStore = defineStore("inspi", {
  state: () => ({
    _activitiesOfTheWeek: [],
    _activityOfTheWeek: {},
    _isLoading: false
  }),

  actions: {
    async fetchActivitiesOfTheWeek(params = {}) {
      try {
        const response = await ActivitiesOfTheWeek.fetchAll(params);
        this._activitiesOfTheWeek = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    activitiesOfTheWeek: (state) => {
      return state._activitiesOfTheWeek;
    },
    activityOfTheWeek: (state) => {
      return state._activityOfTheWeek;
    },
  },
});
