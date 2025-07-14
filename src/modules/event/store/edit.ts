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
    },
    async fetchBookingOptionsById(id: number) {
      try {
        return await EventApi.fetchBookingOptionsById(id);
      } catch (error) {
        console.log(error);
      } 
    },
    async fetchBookingOptionsByBookingId(eventId: any, bookingId: any) {
      try {
        return await EventApi.fetchBookingOptionsByBookingId(eventId, bookingId);
      } catch (error) {
        console.log(error);
      } 
    },
    async createBookingOption(eventId: any, data: object) {
      try {
        return await EventApi.createBookingOption(eventId, data);
      } catch (error) {
        console.log(error);
      } 
    },
    async updateBookingOptionById(eventId: any, bookingId: any, data: object) {
      try {
        return await EventApi.updateBookingOptionById(eventId, bookingId, data);
      } catch (error) {
        console.log(error);
      } 
    }
  },
});
