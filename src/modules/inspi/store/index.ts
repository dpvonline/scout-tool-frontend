import { defineStore } from "pinia";

import ActivitiesOfTheWeek from "@/modules/inspi/services/activity-of-the-week";
import PackageRandomPoll from "@/modules/inspi/services/package-random-poll";
import PollItem from "@/modules/inspi/services/poll-item";

export const useInspiStore = defineStore("inspi", {
  state: () => ({
    _activitiesOfTheWeek: [],
    _activityOfTheWeek: {},
    _isLoading: false,
    _packageRandomPolls: [],
  }),

  actions: {
    async fetchActivitiesOfTheWeek(params = {}) {
      try {
        const response = await ActivitiesOfTheWeek.fetchAll(params);
        this._activitiesOfTheWeek = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchPackageRandomPoll() {
      try {
        const response = await PackageRandomPoll.fetchAll();
        this._packageRandomPolls = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async sendItemPoll(packageRandomPolls: any , winnerId: number) {
      try {
        return await PollItem.create({
          item1: packageRandomPolls.value[0].id,
          item2: packageRandomPolls.value[1].id,
          winner: winnerId,
        });
      } catch (error) {
        // alert(error);
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
    packageRandomPolls: (state) => {
      return state._packageRandomPolls;
    },
  },
});
