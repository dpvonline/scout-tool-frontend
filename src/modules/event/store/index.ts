import { defineStore } from "pinia";

import EventApi from "@/modules/event/services/event";
import MappingApi from "@/modules/auth/services/mapping";
import GroupApi from "@/modules/group/services/group";
import moment from "moment";

const format1 = "YYYY-MM-DD HH:mm:ss";

function nextWeekday(day, weekday) {
  const current = day.day();
  const days = (7 + weekday - current) % 7;
  return day.clone().add(days, "d");
}

export const useEventStore = defineStore("event", {
  state: () => ({
    _events: [],
    _eventOverviews: [],
    _event: {},
    _eventStart: {},
    _eventNames: {},
    _eventDates: {},
    _eventAuth: {},
    _eventCustom: {},
    _isLoading: false,

    _myGroups: [],
    _scoutOrgaLevels: [],
    _djangoGroups: [],
    _themes: [],
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
    newEventReset() {
      this._eventStart = {
        name: "Dein Lager",
        eventStart: moment(new Date()),
      };
      this._eventNames = {
        name: null,
      };
      this._eventDates = {};
      this._eventAuth = {};
      this._eventCustom = {};
    },
    async fetchAllMappings(params = {}) {
      await GroupApi.fetchMyGroups();
    },
    createDataRemote() {
      debugger;
      const eventCreate = {
        name: this._eventNames?.name,
        technicalName: this._eventNames?.technicalName,
        shortDescription: this._eventNames?.shortDescription,
        longDescription: this._eventNames?.longDescription,

        startDate: this._eventDates.startDate,
        endDate: this._eventDates.endDate,
        registrationStart: this._eventDates.registrationStart,
        registrationDeadline: this._eventDates.registrationDeadline,
        lastPossibleUpdate: this._eventDates.lastPossibleUpdate,

        keycloakAdminPath: this._eventAuth.keycloakAdminPath.id,
        keycloakPath: this._eventAuth.keycloakPath.id,
        isPublic: this._eventAuth.isPublic,

        emailSet: this._eventCustom.emailSet.id,

        eventPlanerModules: ["KeycloakAuthorization", "BookingOptionComplex"],
        personalDataRequired: true,
        single_registration: 'E',
      };
      debugger;
      return EventApi.create(eventCreate);
    },
    async fetchMyGroups() {
      this._isLoading = true;
      this._myGroups = [];
      try {
        const response = await GroupApi.fetchMyGroups();
        this._myGroups = response.data;
        this._isLoading = false;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchScoutOrgaLevel() {
      this._isLoading = true;
      try {
        const response = await MappingApi.fetchScoutOrgaLevel();
        this._scoutOrgaLevels = response.data;
        this._isLoading = false;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchDjangoGroups() {
      this._isLoading = true;
      try {
        const response = await MappingApi.fetchDjangoGroups();
        this._djangoGroups = response.data;
        this._isLoading = false;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchThemes() {
      this._isLoading = true;
      try {
        const response = await MappingApi.fetchThemes();
        this._themes = response.data;
        this._isLoading = false;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    updateEventStart(data: any) {
      this._eventStart = data;
      this.updateEventNames({
        name: data.name,
        technicalName: data.name.replace(/[^A-Z0-9]/ig, "_").toLowerCase(),
        shortDescription: data.name,
      });
      this.updateEventDates({
        startDate: moment(data.startDate).set({"hour": 18, "minute": 0, "seconds": 0}).format(format1),
        endDate: nextWeekday(moment(data.startDate), 7).set({"hour": 13, "minute": 0, "seconds": 0}).format(format1),
        registrationStart: moment(data.startDate).subtract(3, 'month').startOf("day").format(format1),
        registrationDeadline: moment(data.startDate).subtract(7, 'day').endOf("day").format(format1),
        lastPossibleUpdate: moment(data.startDate).subtract(1, 'day').set({"hour": 18, "minute": 0, "seconds": 0}).format(format1),
      });
      this.updateEventAuth({
        keycloakAdminPath: data.invitedGroup,
        keycloakPath: data.invitedGroup,
        limitedRegistrationHierarchy: data.invitedGroup,
        isPublic: false,
      });
    },
    updateEventNames(data: any) {
      this._eventNames = data;
    },
    updateEventDates(data: any) {
      this._eventDates = data;
    },
    updateEventAuth(data: any) {
      this._eventAuth = data;
    },
    updateEventCustom(data: any) {
      this._eventCustom = data;
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

    // new Event
    eventStart: (state) => {
      return state._eventStart;
    },
    eventNames: (state) => {
      return state._eventNames;
    },
    eventDates: (state) => {
      return state._eventDates;
    },
    eventAuth: (state) => {
      return state._eventAuth;
    },
    eventCustom: (state) => {
      return state._eventCustom;
    },

    // mappings
    genderMappings: (state) => {
      return [];
    },
    myGroups: (state) => {
      return state._myGroups;
    },
    scoutOrgaLevels: (state) => {
      return state._scoutOrgaLevels;
    },
    djangoGroups: (state) => {
      return state._djangoGroups;
    },
    themes: (state) => {
      return state._themes;
    },
  },
});
