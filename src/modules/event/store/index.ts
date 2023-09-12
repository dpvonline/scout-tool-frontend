import { defineStore } from "pinia";

import EventApi from "@/modules/event/services/event";
import EventFilesApi from "@/modules/event/services/event-files";
import RegistrationApi from "@/modules/event/services/registration";
import MappingApi from "@/modules/auth/services/mapping";
import EventMappingApi from "@/modules/event/services/mapping";
import CashApi from "@/modules/event/services/cash-income";
import GroupApi from "@/modules/group/services/group";
import EventMailApi from "@/modules/event/services/event-mail.ts";
import LocationApi from "@/modules/event/services/location";
import AttributeModuleApi from "@/modules/event/services/attribute-module";

import moment from "moment";
import { any } from "cypress/types/bluebird";
import { param } from "cypress/types/jquery";

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
    _attributeChoices: [],
    _eatHabitTypes: [],

    _eventSummary: [],
    _eventSummaryTotalParticipants: [],
    _eventSummaryTotalRegistrations: [],
    _eventSummaryBookingOptions: [],
    _eventFoodSummary: [],
    _eventAgeGroupsSummary: [],
    _eventAttributesSummary: [],
    _eventCashSummary: [],
    _eventCashListSummary: [],
    _eventCashDetails: [],
    _eventPersonsSummary: [],
    _eventLocationSummary: [],
    _registrationLocationsSummary: [],
    _hierarchyMappingDetailed: [],
    _registrationsResponsiblePersons: [],

    _eventmodules: [
      {
        id: 1,
        order: 1,
        content: "test1",
      },
      {
        id: 2,
        order: 2,
        content: "test2",
      },
      {
        id: 3,
        order: 3,
        content: "teat3",
      },
    ],
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
    async fetchEventSummary(id: any, params = {}) {
      this._isLoading = true;
      try {
        const response = await EventApi.fetchEventSummary(id, params);
        this._eventSummary = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchEventSummaryTotalParticipants(id: any) {
      try {
        const response = await EventApi.fetchEventSummaryTotalParticipants(id);
        this._eventSummaryTotalParticipants = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchEventSummaryTotalRegistrations(id: any) {
      try {
        const response = await EventApi.fetchEventSummaryTotalRegistrations(id);
        this._eventSummaryTotalRegistrations = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchEventSummaryBookingOptions(id: any) {
      try {
        const response = await EventApi.fetchEventSummaryBookingOptions(id);
        this._eventSummaryBookingOptions = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchFoodSummary(id: any, params: any) {
      try {
        const response = await EventApi.fetchFoodSummary(id, params);
        this._eventFoodSummary = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchAgeGroupsSummary(id: any, params: any) {
      try {
        const response = await EventApi.fetchAgeGroupsSummary(id, params);
        this._eventAgeGroupsSummary = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchAttributesSummary(id: any, params: any) {
      try {
        const response = await EventApi.fetchAttributesSummary(id, params);
        this._eventAttributesSummary = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchCashListSummary(id: any, params: any) {
      try {
        const response = await EventApi.fetchCashListSummary(id, params);
        this._eventCashListSummary = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchCashSummary(id: any) {
      try {
        const response = await EventApi.fetchCashSummary(id);
        this._eventCashSummary = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchEventPaymentsById(reg_id: any, params: any) {
      try {
        const response = await EventApi.fetchCashDetailById(reg_id, params);
        this._eventCashDetails = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchPersonsSummary(id: any, params: any) {
      this._isLoading = true;
      try {
        const response = await EventApi.fetchPersonsSummary(id, params);
        this._eventPersonsSummary = response.data;
        this._isLoading = false;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchEventOverviews(params = {}) {
      this._isLoading = true;
      try {
        const response = await EventApi.fetchAllOverviews(params);
        this._eventOverviews = response.data;
        this._isLoading = false;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchMyInvitations(params = {}) {
      this._isLoading = true;
      try {
        const response = await EventApi.fetchMyInvitations(params);
        this._invitations = response.data;
        this._isLoading = false;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchEvent(id: number) {
      try {
        const response = await EventApi.fetchById(id);
        this._event = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async getRegistrationsResponsiblePersons(eventId: number, params: any) {
      try {
        const response = await EventMailApi.getRegistrationsResponsiblePersons(eventId, params);
        this._registrationsResponsiblePersons = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async sendPaymentReminder(data: any) {
      try {
        const response = await EventApi.sendPaymentReminder(data);
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async sendSinglePaymentReminder(data: any) {
      try {
        const response = await EventApi.sendSinglePaymentReminder(data);
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async getAvailableFileTemplates(params: any) {
      try {
        const response = await EventFilesApi.getAvailableFileTemplates(params);
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async addFileRequest(eventId: any, params: any) {
      try {
        const response = await EventFilesApi.addFileRequest(eventId, params);
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async getDownloadSummary(eventId: any, params: any) {
      try {
        const response = await EventFilesApi.getDownloadSummary(eventId, params);
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async getFileType(eventId: any, params: any) {
      try {
        return await EventFilesApi.getFileType(eventId, params);
      } catch (error) {
        console.log(error);
      }
    },
    async getFileGenerationStatus(eventId: any, params: any) {
      try {
        return await EventFilesApi.getFileGenerationStatus(eventId, params);
      } catch (error) {
        console.log(error);
      }
    },
    async getFileExtension(eventId: any, params: any) {
      try {
        return await EventFilesApi.getFileExtension(eventId, params);
      } catch (error) {
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
        return response;
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
      this._isLoading = true;
      try {
        const response = await RegistrationApi.fetchMyRegistrations(params);
        this._registrations = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchRegistration(id: number) {
      try {
        const response = await RegistrationApi.fetchById(id);
        this._registration = response.data;
        return response;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async deleteRegistration(id: number) {
      try {
        const response = await RegistrationApi.delete(id);
        this._registration = [];
        return response;
      } catch (error) {
        return error;
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
      try {
        const response = await MappingApi.fetchScoutOrgaLevel();
        this._scoutOrgaLevels = response.data;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchAttributeTypes() {
      try {
        const response = await MappingApi.fetchAttributeChoices();
        return response.data;
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
      try {
        const response = await MappingApi.fetchThemes();
        this._themes = response.data;
      } catch (error) {
        // // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchEmailSets() {
      try {
        const response = await MappingApi.fetchEmailSets();
        this._emailSets = response.data;
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
    async fetchAttributeChoices() {
      this._isLoading = true;
      try {
        const response = await EventMappingApi.fetchAttributeChoices();
        this._isLoading = false;
        return response.data;
      } catch (error) {
        this._isLoading = false;
      }
    },
    async fetchEatHabitTypes() {
      try {
        const response = await MappingApi.fetchEatHabit();
        this._eatHabitTypes = response.data;
      } catch (e) {
        alert(e);
        console.error(e);
      }
    },
    async getEventLocationSummary(eventId: any, params: any) {
      try {
        const response = await EventApi.getEventLocationSummary(eventId, params);
        this._eventLocationSummary = response.data;
      } catch (e) {
        alert(e);
        console.error(e);
      }
    },
    async getRegistrationLocationsSummary(eventId: any, params: any) {
      try {
        const response = await EventApi.getRegistrationLocationsSummary(eventId, params);
        this._registrationLocationsSummary = response.data;
      } catch (e) {
        alert(e);
        console.error(e);
      }
    },
    async getHierarchyMappingDetailed() {
      try {
        const response = await EventApi.getHierarchyMappingDetailed();
        this._hierarchyMappingDetailed = response.data;
      } catch (e) {
        alert(e);
        console.error(e);
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
        invitedGroups: [data.invitedGroup.id],
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
    async createPayment(data: Object) {
      try {
        return await CashApi.create(data);
      } catch (error) {
        console.log(error);
      }
    },
    async updatePayment(data: Object) {
      try {
        return await CashApi.update(data);
      } catch (error) {
        console.log(error);
      }
    },
    async deletePayment(id: any) {
      try {
        return await CashApi.delete(id);
      } catch (error) {
        console.log(error);
      }
    },
    async createAttributeModule(data: Object) {
      try {
        return await AttributeModuleApi.create(data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateAttributeModule(data: Object) {
      try {
        return await AttributeModuleApi.update(data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAttributeModule(id: any) {
      try {
        return await AttributeModuleApi.delete(id);
      } catch (error) {
        console.log(error);
      }
    },
    async createLocation(data: Object) {
      try {
        return await LocationApi.create(data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateLocation(data: Object) {
      try {
        return await LocationApi.update(data);
      } catch (error) {
        console.log(error);
      }
    },
    async eventPartialUpdate(data: Object) {
      try {
        return await EventApi.updatePartial(data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateEventModuleById(eventId: any, eventModuleId: any, data: Object) {
      try {
        return await EventApi.updateEventModuleById(eventId, eventModuleId, data);
      } catch (error) {
        console.log(error);
      }
    },
    async createEventModule(eventId: any, data: Object) {
      try {
        return await EventApi.createEventModule(eventId, data);
      } catch (error) {
        console.log(error);
      }
    },
    async mergeRegistrations(eventId: any, data: Object) {
      try {
        return await EventApi.mergeRegistrations(eventId, data);
      } catch (error) {
        console.log(error);
      }
    },
    async updatePartialEventModuleById(eventId: any, eventModuleId: any, data: Object) {
      try {
        return await EventApi.updatePartialEventModuleById(eventId, eventModuleId, data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteEventModule(eventId: any, eventModuleId: any) {
      try {
        return await EventApi.deleteEventModule(eventId, eventModuleId);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteModuleAttribute(id: any) {
      try {
        return await AttributeModuleApi.delete(id);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAvailableModules(eventId: any) {
      try {
        return await EventApi.fetchAvailableModules(eventId);
      } catch (error) {
        console.log(error);
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
    isLoading: (state) => {
      return state._isLoading;
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
    attributeChoices: (state) => {
      return state._attributeChoices;
    },
    eatHabitTypes: (state) => {
      return state._eatHabitTypes;
    },
    eventSummary: (state) => {
      return state._eventSummary;
    },
    eventSummaryTotalParticipants: (state) => {
      return state._eventSummaryTotalParticipants;
    },
    eventSummaryTotalRegistrations: (state) => {
      return state._eventSummaryTotalRegistrations;
    },
    eventSummaryBookingOptions: (state) => {
      return state._eventSummaryBookingOptions;
    },
    eventFoodSummary: (state) => {
      return state._eventFoodSummary;
    },
    eventAgeGroupsSummary: (state) => {
      return state._eventAgeGroupsSummary;
    },
    eventAttributesSummary: (state) => {
      return state._eventAttributesSummary;
    },
    eventCashSummary: (state) => {
      return state._eventCashSummary;
    },
    eventCashListSummary: (state) => {
      return state._eventCashListSummary;
    },
    eventCashDetails: (state) => {
      return state._eventCashDetails;
    },
    eventPersonsSummary: (state) => {
      return state._eventPersonsSummary;
    },
    eventLocationSummary: (state) => {
      return state._eventLocationSummary;
    },
    registrationLocationsSummary: (state) => {
      return state._registrationLocationsSummary;
    },
    hierarchyMappingDetailed: (state) => {
      return state._hierarchyMappingDetailed;
    },
    registrationsResponsiblePersons: (state) => {
      return state._registrationsResponsiblePersons;
    },
    eventmodules: (state) => {
      return state._event?.eventmoduleSet;
    },
  },
});
