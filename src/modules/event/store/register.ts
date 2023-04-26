import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

import EventApi from "@/modules/event/services/event";
import RegistrationApi from "@/modules/event/services/registration";
import MappingApi from "@/modules/auth/services/mapping";
import GroupApi from "@/modules/group/services/group";
import moment from "moment";

const format1 = "YYYY-MM-DD HH:mm:ss";

export const useEventRegisterStore = defineStore("eventRegisterStore", {
  state: () => ({
    _event: {},
    _isLoading: false,

    _registration: {},

    _scoutOrgaLevels: [],
    _djangoGroups: [],

    _registerStart: {},
    _registerPerson: [],
    _registerTravel: [],
    _registerFreeText: {},
  }),

  actions: {
    async fetchEvent(id: number) {
      try {
        const response = await EventApi.fetchById(id);
        this._event = response.data;
      } catch (error) {
        // alert(error);
        console.log(error);
      }
    },
    async fetchAllMappings(params = {}) {
      await GroupApi.fetchMyGroups();
    },
    async create() {
      const registerCreate = {
        event: this._event?.id,
        scoutOrganisation: this._registerStart?.scoutGroup?.id,
      };
      const register = await RegistrationApi.create(registerCreate);

      const promises = [];
      this._registerPerson.forEach((person) => {
        promises.push(RegistrationApi.createParticipant(register.data.id, person));
      });
      const responses = await Promise.all(promises);
      return register;
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
    addPerson(data: any) {
      this._registerPerson.push({
        id: uuidv4(),
        firstName: data.firstName,
        lastName: data.lastName,
        scoutName: data.scoutName,
        gender: data.gender,
        street: data.street,
        zipCode: data.zipCode,
        eatHabit: data.eatHabit,
        bookingOption: data.bookingOption?.id,
      });
    },
    removePerson(doc: any) {
      this._registerPerson.forEach((item, index) => {
        if (item === doc) this._registerPerson.splice(index, 1);
      });
    },
    updateRegisterStart(data: any) {
      this._registerStart = data;
    },
    updateRegisterTravel(data: any) {
      this._registerTravel.push(data);
    },
    updateRegisterFreeText(data: any) {
      this._registerFreeText = data;
    },
  },
  getters: {
    event: (state) => {
      return state._event;
    },

    // new Event
    registerPerson: (state) => {
      return state._registerPerson;
    },
    registerStart: (state) => {
      return state._registerStart;
    },
    registerTravel: (state) => {
      return state._registerTravel;
    },
    registerFreeText: (state) => {
      return state._registerFreeText;
    },

    // registrations
    registration: (state) => {
      return state._registration;
    },

    // mappings
    genderMappings: (state) => {
      return [];
    },
    scoutOrgaLevels: (state) => {
      return state._scoutOrgaLevels;
    },
    djangoGroups: (state) => {
      return state._djangoGroups;
    },
  },
  persist: true,
});
