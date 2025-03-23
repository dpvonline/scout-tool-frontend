import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

import EventApi from "@/modules/event/services/event";
import RegistrationApi from "@/modules/event/services/registration";
import MappingApi from "@/modules/auth/services/mapping";
import GroupApi from "@/modules/group/services/group";
import attributeModule from "../services/attribute-module";
import { useCommonStore } from "@/modules/common/store";

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
    _registerCustom: [],
    _eatHabitTypes: [],
    _scoutHierarchy: [],
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
    async addablePersons(regId: number, params: any) {
      return await RegistrationApi.addablePersons(regId, params);
    },
    async createRating(regId: number, data: any) {
      return await RegistrationApi.createRating(regId, data);
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
    async fetchAllMappings(eventId: any, levelId = 5) {
      await GroupApi.fetchMyGroups();
      await this.fetchEvent(eventId);
      await this.fetchEatHabitTypes();
      await this.fetchScoutHierarchy();
    },
    async createAttribute(regId: any, data: any, type: any) {
      if (type === "booleanAttribute") {
        return await RegistrationApi.createBooleanAttribute(regId, data);
      } else if (type === "stringAttribute") {
        return await RegistrationApi.createStringAttribute(regId, data);
      } else if (type === "travelAttribute") {
        return await RegistrationApi.createTravelAttribute(regId, data);
      } else if (type === "floatAttribute") {
        return await RegistrationApi.createFloatAttribute(regId, data);
      } else if (type === "dateTimeAttribute") {
        return await RegistrationApi.createDateTimeAttribute(regId, data);
      } else if (type === "integerAttribute") {
        return await RegistrationApi.createIntegerAttribute(regId, data);
      }
    },
    async updateAttribute(id: any, data: any, type: any) {
      if (type === "booleanAttribute") {
        return await RegistrationApi.updateBooleanAttribute(id, data);
      } else if (type === "stringAttribute") {
        return await RegistrationApi.updateStringAttribute(id, data);
      } else if (type === "travelAttribute") {
        return await RegistrationApi.updateTravelAttribute(id, data);
      } else if (type === "integerAttribute") {
        return await RegistrationApi.updateIntegerAttribute(id, data);
      } else if (type === "floatAttribute") {
        return await RegistrationApi.updateFloatAttribute(id, data);
      } else if (type === "dateTimeAttribute") {
        return await RegistrationApi.updateDateTimeAttribute(id, data);
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
      await this.fetchEatHabitTypes();

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
        const statusText =  JSON.stringify(e.response.data); // Bad Request
        return `Fehler beim Erstellen der Anmeldung. Dein Stamm oder die Veranstaltung wurden nicht gefunden. ${statusText}`
      }
      const regId = register.data.id;
      const promises = [];
      this._registerPerson.forEach((person) => {
        promises.push(RegistrationApi.createParticipant(regId, this.transformEatHabits(person)));
      });
      // travel
      this._registerTravel.forEach((travelItem) => {
        const attributeModuleIdTravel = this._event?.eventmoduleSet.filter((item) => item.id === travelItem?.attributeModule)[0]
          .attributeModules[0].id;
        promises.push(
          this.createAttribute(
            regId,
            {
              numberPersons: parseInt(travelItem.numberPersons, 10),
              typeField: travelItem.typeField.value,
              dateTimeField: travelItem.dateTimeField,
              description: travelItem.description,
              attributeModule: attributeModuleIdTravel,
            },
            "travelAttribute"
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
            "stringAttribute"
          )
        );
      }
      const fieldTypes = {
        booleanAttribute: "booleanField",
        dateTimeAttribute: "dateTimeField",
        integerAttribute: "integerField",
        floatAttribute: "floatField",
        stringAttribute: "stringField",
        travelAttribute: "travelField",
      }
      for (const [moduleId, attData] of Object.entries(this._registerCustom)) {
        if (attData) {
          Object.keys(attData).forEach(att => {
            const attId = att.split("_")[1];
            const mod = this._event?.eventmoduleSet.find((module) => module.id == moduleId)
            if (mod) {
              const attribute = mod.attributeModules.find(attribute => attribute.id == attId)
              if (attribute) {
                promises.push(
                  this.createAttribute(
                    regId,
                    {
                      [fieldTypes[attribute.fieldType]]: this._registerCustom[moduleId][att],
                      attributeModule: parseInt(attId, 10),
                    },
                    attribute.fieldType,
                  )
                );
              }
            }
          })
        }
      }

      try {
        responses = await Promise.all(promises);
      } catch (e: any) {
        const statusCode = e.response.status; // 400
        const statusText = e.response?.data?.detail ? e.response?.data?.detail : 'Unbekannter Fehler '; // Bad Request
        await this.cleanUpRegCreate(regId);
        return 'Fehler beim Erstellen der Anmeldung. Prüfe deine Eingaben nochmal komplett. Ein Pflichtfeld fehlt.';
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
    async fetchScoutHierarchy() {
      try {
        const response = await MappingApi.fetchScoutGroupMapping(3);
        this._scoutHierarchy = response.data;
        return response;
      } catch (error) {
        return error;
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
        bookingOptionName: data.bookingOption?.name,
        person: data.id,
        idNumber: data.idNumber,
        scoutLevel: data.scoutLevel,
        scoutFunction: data.scoutFunction,
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
        attributeModule: data.attributeModule,
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
    updateRegisterCustom(moduleId: number, data: any) {
      this._registerCustom[moduleId] = data;
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
    registerCustom: (state) => {
      return state._registerCustom;
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
    scoutHierarchy: (state) => {
      return state._scoutHierarchy;
    },
  },
  persist: true,
});
