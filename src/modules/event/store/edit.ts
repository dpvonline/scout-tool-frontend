import { defineStore } from "pinia";
import EventApi from "@/modules/event/services/event";

export const useEventEditStore = defineStore("eventEditStore", {
  actions: {
    async updateEvent(data: any) {
      try {
        return await EventApi.update(data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTechById(id: number) {
      try {
        return await EventApi.fetchTechById(id);
      } catch (error) {
        console.log(error);
      } 
    }
  },
});
