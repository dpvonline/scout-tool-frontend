import { defineStore } from "pinia";
import { keycloak } from "@/modules/auth/keycloak";
import { KeycloakProfile } from "keycloak-js";
import {
  RegisterBasics,
  RegisterPersonalDetails,
  RegisterScoutDetails,
} from "../views/slides/types";
import { useStorage } from "@vueuse/core";
import services from "@/modules/auth/services/mapping";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    _accessToken: <string | undefined>"",
    _refreshToken: <string | undefined>"",
    _user: <{} | undefined>{},
    _isAuth: <boolean | undefined>false,
    _isAdmin: <boolean | undefined>false,
    _isKeycloakInit: <boolean | undefined>false,
  }),

  actions: {
    login(route: string) {
      keycloak.login();
    },
    logout(route: string) {
      keycloak.logout();
    },
  },

  getters: {
    accessToken: (state) => {
      return state._accessToken;
    },
    refreshToken: (state) => {
      return state._refreshToken;
    },
    user: (state) => {
      return state._user;
    },
    isAuth: (state) => {
      return state._isAuth;
    },
    isAdmin: (state) => {
      return state._isAdmin;
    },
    isKeycloakInit: (state) => {
      return state._isKeycloakInit;
    },
  },
});

export const useRegisterStore = defineStore("registerStore", {
  state: () => ({
    _mappings: useStorage("_mappings", {
      gender: [],
      scoutHierarchy: [],
      scoutLevel: [],
    }),
    _userdata: {
      basics: useStorage("basics", {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
      }),
      scoutDetails: useStorage("scoutDetails", {
        scoutName: "",
        scoutOrganisation: "",
        scoutLevel: "",
      }),
      
      personalDetails: useStorage("personalDetails", {
        mobileNumber: "",
        dsgvoConfirmed: false,
        firstName: "",
        lastName: "",
        address: "",
        addressSupplement: "",
        zipCode: "",
        gender: "",
        birthdate: "",
      }),
    },
  }),
  actions: {
    async fetchAllMappings(params = {}) {
      try {
        const genders = await services.fetchGenderMappings();
        this._mappings.gender = genders.data;
        console.log(this._mappings.gender);
      } catch (e) {
        alert(e);
        console.error(e);
      }

      try {
        const scoutHierarchy = await services.fetchScoutHierarchyMappings();
        this._mappings.scoutHierarchy = scoutHierarchy.data;
        console.log(this._mappings.scoutHierarchy);
      } catch (e) {
        alert(e);
        console.error(e);
      }
      try {
        const scoutLevel = await services.fetchScoutLevelMappings();
        this._mappings.scoutLevel = scoutLevel.data;
        console.log(this._mappings.scoutLevel);
      } catch (e) {
        alert(e);
        console.error(e);
      }
    },
    register() {
      const summary = {
        username: this._userdata.basics.username,
        password: this._userdata.basics.password,
        email: this._userdata.basics.email,
        scoutName: this._userdata.scoutDetails.scoutName,
        scoutOrganisation: this._userdata.scoutDetails.scoutOrganisation.id,
        mobileNumber: this._userdata.personalDetails.mobileNumber,
        dsgvoConfirmed: this._userdata.personalDetails.dsgvoConfirmed,
        firstName: this._userdata.personalDetails.firstName,
        lastName: this._userdata.personalDetails.lastName,
        address: this._userdata.personalDetails.address,
        addressSupplement: this._userdata.personalDetails.addressSupplement,
        zipCode: this._userdata.personalDetails.zipCode,
        birthDate: this._userdata.personalDetails.birthdate,
        gender: this._userdata.personalDetails.gender.value,
        scoutLevel: this._userdata.scoutDetails.scoutLevel.value
      }

      //todo
    },
    updateBasics(basics: RegisterBasics) {
      this._userdata.basics = basics;
    },
    updateScoutDetails(scoutDetails: RegisterScoutDetails) {
      this._userdata.scoutDetails = scoutDetails;
    },
    updatePersonalDetails(personalDetails: RegisterPersonalDetails) {
      this._userdata.personalDetails = personalDetails;
    },
  },
  getters: {
    basics: (state) => {
      return state._userdata.basics;
    },
    scoutDetails: (state) => {
      return state._userdata.scoutDetails;
    },
    personalDetails: (state) => {
      return state._userdata.personalDetails;
    },
    genderMappings: (state) => {
      return state._mappings.gender;
    },
    scoutHierarchyMappings: (state) => {
      return state._mappings.scoutHierarchy;
    },
    scoutLevelMappings: (state) => {
      return state._mappings.scoutLevel;
    },
    // isAuth: (state) => {
    //   return state._isAuth;
    // }
  },
});
