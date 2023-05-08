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
    _eatHabitTypes: [],
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
    async sendConfirmMail(regId: number) {
      try {
        return await RegistrationApi.sendConfirmMail(regId);
      } catch (error) {
        // alert(error);
        console.log(error);
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
    async fetchAllMappings(eventId: any) {
      await GroupApi.fetchMyGroups();
      await this.fetchEvent(eventId);
      await this.fetchEatHabitTypes();
    },
    async createAttribute(regId: any, data: any, type: any) {
      if (type === "boolean") {
        await RegistrationApi.createBooleanAttribute(regId, data);
      } else if (type === "string") {
        await RegistrationApi.createStringAttribute(regId, data);
      } else if (type === "travel") {
        await RegistrationApi.createTravelAttribute(regId, data);
      }
    },

    transformEatHabits(person: object) {
      if (person.eatHabit && person.eatHabit.length > 0) {
        person.eatHabit = person.eatHabit.map((item) => {
          return this._eatHabitTypes.find((eatHabitType) => eatHabitType.id === item).name;
        });
      }
      return person;
    },
    async create() {
      const registerCreate = {
        event: this._event?.id,
        scoutOrganisation: this._registerStart?.scoutGroup?.id,
      };
      const register = await RegistrationApi.create(registerCreate);

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
              typeField: travelItem.typeField[0].value,
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
        address: data.address,
        birthday: data.birthday,
        zipCode: data.zipCode,
        eatHabit: data.eatHabit,
        gender: data.gender,
        bookingOption: data.bookingOption?.id,
      });
    },
    addTravel(data: any) {
      this._registerTravel.push({
        id: uuidv4(),
        numberPersons: data.numberPersons,
        typeField: data.typeField,
        dateTimeField: data.dateTimeField,
        description: data.description,
      });
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
