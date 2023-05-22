import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

import EventApi from "@/modules/event/services/event";
import RegistrationApi from "@/modules/event/services/registration";
import MappingApi from "@/modules/auth/services/mapping";
import GroupApi from "@/modules/group/services/group";

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
    _eatHabitTypes: [],
  }),

  actions: {
    async fetchEvent(id: number) {
      this._isLoading = true;
      try {
        const response = await EventApi.fetchById(id);
        this._event = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async sendConfirmMail(regId: number) {
      return await RegistrationApi.sendConfirmMail(regId);
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
    async fetchAllMappings(eventId: any) {
      await GroupApi.fetchMyGroups();
      await this.fetchEvent(eventId);
      await this.fetchEatHabitTypes();
    },
    async createAttribute(regId: any, data: any, type: any) {
      if (type === "boolean") {
        return await RegistrationApi.createBooleanAttribute(regId, data);
      } else if (type === "string") {
        return await RegistrationApi.createStringAttribute(regId, data);
      } else if (type === "travel") {
        return await RegistrationApi.createTravelAttribute(regId, data);
      }
    },
    async updateAttribute(id: any, data: any, type: any) {
      if (type === "boolean") {
        return await RegistrationApi.updateBooleanAttribute(id, data);
      } else if (type === "string") {
        return await RegistrationApi.updateStringAttribute(id, data);
      } else if (type === "travel") {
        return await RegistrationApi.updateTravelAttribute(id, data);
      }
    },

    transformEatHabits(person: object) {
      if (person.eatHabit && person.eatHabit.length > 0) {
        person.eatHabit = person.eatHabit.map((item) => {
          if (typeof item === "string") {
            return item;
          }
          return this._eatHabitTypes.find((eatHabitType) => eatHabitType.id === item).name;
        });
      }
      if (person?.bookingOption && person?.bookingOption?.id) {
        person.bookingOption = person?.bookingOption?.id;
      }
      return person;
    },

    async addPersonToReg(regId: any, person: object) {
      return await RegistrationApi.createParticipant(regId, this.transformEatHabits(person));
    },
    async updatePersonToReg(regId: any, person: object) {
      return await RegistrationApi.updateParticipant(regId, person?.id, this.transformEatHabits(person));
    },
    async deletePersonToReg(regId: any, person: object) {
      return await RegistrationApi.deleteParticipant(regId, person?.id);
    },
    async addResponsablePerson(data: object) {
      return await RegistrationApi.update(data);
    },
    async cleanUpRegCreate(regId: any) {
      return await RegistrationApi.delete(regId);
    },
    async create() {
      const registerCreate = {
        event: this._event?.id,
        scoutOrganisation: this._registerStart?.scoutGroup?.id,
      };
      let register = null;
      let responses = null;
      let mailResponse = null;
      try {
        register = await RegistrationApi.create(registerCreate);
      } catch (e: any) {
        const statusCode = e.response.status; // 400
        const statusText = e.response.statusText; // Bad Request
        return false;
      }

      const regId = register.data.id;

      const promises = [];
      this._registerPerson.forEach((person) => {
        promises.push(RegistrationApi.createParticipant(regId, this.transformEatHabits(person)));
      });

      // travel
      const attributeModuleIdTravel = this._event?.eventmoduleSet.filter((item) => item.name === "Travel")[0]
        .attributeModules[0];
      this._registerTravel.forEach((travelItem) => {
        promises.push(
          this.createAttribute(
            regId,
            {
              numberPersons: parseInt(travelItem.numberPersons, 10),
              typeField: travelItem.typeField.value,
              dateTimeField: travelItem.dateTimeField,
              description: travelItem.description,
              attributeModule: attributeModuleIdTravel?.id,
            },
            "travel"
          )
        );
      });

      // freetext
      const attributeModuleIdLetter = this._event?.eventmoduleSet.filter((item) => item.name === "Letter")[0]
        .attributeModules[0].id;
      if (this._registerFreeText?.freeText) {
        promises.push(
          this.createAttribute(
            regId,
            {
              stringField: this._registerFreeText?.freeText,
              attributeModule: attributeModuleIdLetter,
            },
            "string"
          )
        );
      }
      try {
        responses = await Promise.all(promises);
      } catch (e: any) {
        const statusCode = e.response.status; // 400
        const statusText = e.response.statusText; // Bad Request
        await this.cleanUpRegCreate(regId);
        return false;
      }
      try {
        mailResponse = await this.sendConfirmMail(regId);
      } catch (e: any) {
        const statusCode = e.response.status; // 400
        const statusText = e.response.statusText; // Bad Request
        mailResponse = e;
      }
      return {
        regId,
        attributes: responses,
        mailResponse,
      };
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
        storeId: uuidv4(),
        firstName: data.firstName,
        lastName: data.lastName,
        scoutName: data.scoutName,
        address: data.address,
        birthday: data.birthday,
        zipCode: data.zipCode,
        eatHabit: data.eatHabit,
        gender: data.gender,
        bookingOption: data.bookingOption?.id,
      });
    },
    editPerson(data: any) {
      this.addPerson(data);
      this._registerPerson = this._registerPerson.filter((item) => item.storeId !== data.storeId);
    },
    addTravel(data: any) {
      this._registerTravel.push({
        storeId: uuidv4(),
        numberPersons: data.numberPersons,
        typeField: data.typeField,
        dateTimeField: data.dateTimeField,
        description: data.description,
      });
    },
    editTravel(data: any) {
      this.addTravel(data);
      this._registerTravel = this._registerTravel.filter((item) => item.storeId !== data.storeId);
    },
    removePerson(doc: any) {
      this._registerPerson.forEach((item, index) => {
        if (item === doc) this._registerPerson.splice(index, 1);
      });
    },
    removeTravel(doc: any) {
      this._registerTravel.forEach((item, index) => {
        if (item === doc) this._registerTravel.splice(index, 1);
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
    registerPersonCount: (state) => {
      return state._registerPerson.length;
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
    eatHabitTypes: (state) => {
      return state._eatHabitTypes;
    },
  },
  persist: true,
});
