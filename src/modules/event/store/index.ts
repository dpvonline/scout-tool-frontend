import { defineStore } from "pinia";

import EventApi from "@/modules/event/services/event";
import RegistrationApi from "@/modules/event/services/registration";
import MappingApi from "@/modules/auth/services/mapping";
import EventMappingApi from "@/modules/event/services/mapping";
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

    _invitation: {},
    _invitations: [],

    _registration: {},
    _registrations: [],

    _myGroups: [],
    _scoutOrgaLevels: [],
    _djangoGroups: [],
    _themes: [],
    _emailSets: [],
    _bookingOptions: [],
    _eventLocations: [],
    _travelTypeChoices: [],
    _eatHabitTypes: [],
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
    async fetchMyInvitations(params = {}) {
      try {
        const response = await EventApi.fetchMyInvitations(params);
        this._invitations = response.data;
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
      await this.fetchTravelTypeChoices();
    },
    createDataRemote() {
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

        adminGroup: this._eventAuth.adminGroup.id,
        viewGroup: this._eventAuth.viewGroup.id,
        isPublic: this._eventAuth.isPublic,
        invitedGroups: this._eventAuth.invitedGroups,
        invitingGroup: this._eventAuth.invitingGroup.id,

        emailSet: this._eventCustom.emailSet.id,
        theme: this._eventCustom.theme.id,
        price: this._eventCustom.price,
        location: this._eventCustom.location.id,

        eventPlanerModules: ["KeycloakAuthorization", "BookingOptionComplex"],
        personalDataRequired: true,
        singleRegistration: "E",
      };
      return EventApi.create(eventCreate);
    },
    async fetchRegistrations(params = {}) {
      try {
        const response = await RegistrationApi.fetchAll(params);
        this._registrations = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchBookingOptionsById(id: Number) {
      try {
        const response = await EventApi.fetchBookingOptionsById(id);
        this._bookingOptions = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchMyRegistrations(params = {}) {
      try {
        const response = await RegistrationApi.fetchMyRegistrations(params);
        this._registrations = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchRegistration(id: number) {
      try {
        const response = await RegistrationApi.fetchById(id);
        this._registration = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
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
    async fetchEmailSets() {
      this._isLoading = true;
      try {
        const response = await MappingApi.fetchEmailSets();
        this._emailSets = response.data;
        this._isLoading = false;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchEventLocations() {
      this._isLoading = true;
      try {
        const response = await MappingApi.fetchEventLocations();
        this._eventLocations = response.data;
        this._isLoading = false;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchTravelTypeChoices() {
      this._isLoading = true;
      try {
        const response = await EventMappingApi.fetchTravelTypeChoices();
        this._travelTypeChoices = response.data;
        this._isLoading = false;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchEatHabitTypes() {
      try {
        const response = await MappingApi.fetchEatHabit()
        this._eatHabitTypes = response.data
      } catch (e) {
        alert(e)
        console.error(e)
      }
    },
    updateEventStart(data: any) {
      this._eventStart = data;
      this.updateEventNames({
        name: data.name,
        technicalName: data.name.replace(/[^A-Z0-9]/gi, "_").toLowerCase(),
        shortDescription: data.name,
        longDescription: `Einladungtext für ${data.name}`,
      });
      this.updateEventDates({
        startDate: moment(data.startDate).set({ hour: 18, minute: 0, seconds: 0 }).format(format1),
        endDate: nextWeekday(moment(data.startDate), 7).set({ hour: 13, minute: 0, seconds: 0 }).format(format1),
        registrationStart: moment(data.startDate).subtract(3, "month").startOf("day").format(format1),
        registrationDeadline: moment(data.startDate).subtract(7, "day").endOf("day").format(format1),
        lastPossibleUpdate: moment(data.startDate)
          .subtract(1, "day")
          .set({ hour: 18, minute: 0, seconds: 0 })
          .format(format1),
      });
      this.updateEventAuth({
        adminGroup: data.invitedGroup,
        viewGroup: data.invitedGroup,
        invitedGroups: [data.invitedGroup],
        invitingGroup: data.invitedGroup,
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

    // registrations
    invitation: (state) => {
      return state._invitation;
    },
    invitations: (state) => {
      return state._invitations;
    },

    // registrations
    registration: (state) => {
      return state._registration;
    },
    registrations: (state) => {
      return state._registrations;
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
    emailSets: (state) => {
      return state._emailSets;
    },
    bookingOptions: (state) => {
      return state._bookingOptions;
    },
    eventLocations: (state) => {
      return state._eventLocations;
    },
    travelTypeChoices: (state) => {
      return state._travelTypeChoices;
    },
    eatHabitTypes: (state) => {
      return state._eatHabitTypes
    },
  },
});
