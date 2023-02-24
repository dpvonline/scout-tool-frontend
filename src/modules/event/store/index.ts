import { defineStore } from "pinia";

import EventApi from "@/modules/event/services/event";

export const useEventStore = defineStore("event", {
  state: () => ({
    _events: [],
    _eventOverviews: [],
    _event: {},
  }),

  actions: {
    async fetchEvents(params = {}) {
      try {
        const response = await EventApi.fetchAll(params);
        this._events = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchEventOverviews(params = {}) {
      try {
        const response = await EventApi.fetchAllOverviews(params);
        this._eventOverviews = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchEvent(id: number) {
      try {
        const response = await EventApi.fetchById(id);
        this._event = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async createEvent(data: object) {
      try {
        return await EventApi.create(data);
      } catch (error) {
        if (error.response.status === 400) {
          // commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          // commonStore.showError('Schwerer Server Fehler');
        }
      }
    },
  },
  getters: {
    events: (state) => {
      return state._events;
    },
    event: (state) => {
      return state._event;
    },
    eventOverviews: (state) => {
      return state._eventOverviews;
    },
  },
});
