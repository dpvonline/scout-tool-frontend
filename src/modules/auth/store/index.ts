import { defineStore } from "pinia";
import { keycloak } from "@/modules/auth/keycloak";
import { KeycloakProfile } from "keycloak-js";
import { RegisterBasics, RegisterPersonalDetails, RegisterScoutDetails } from "../views/slides/types";
import { useStorage } from "@vueuse/core"

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
    _basics: useStorage('_basics', {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
    }),
    _scoutDetails: useStorage('_scoutDetails', {
        scoutName: "",
        scoutOrganisation: 0,
        scoutLevel: ""
    }),
    _personalDetails: useStorage('_personalDetails', {
        mobileNumber: "",
        dsgvoConfirmed: false,
        emailNotification: "",
        smsNotification: false,
        firstName: "",
        lastName: "",
        address: "",
        addressSupplement: "",
        zipCode: "",
        gender: "",
        birthdate: "",
    })
  }),

  actions: {
    register(route: string) {
        if (this._basics.password !== this._basics.repeatPassword) {
            //todo abort
        }
    },
    updateBasics(basics: RegisterBasics) {
        this._basics = basics;
    },
    updateScoutDetails(scoutDetails: RegisterScoutDetails) {
        this._scoutDetails = scoutDetails;
    },
    updatePersonalDetails(personalDetails: RegisterPersonalDetails) {
        this._personalDetails = personalDetails;
    }
  },
  getters: {
    basics: (state) => {
      return state._basics;
    },
    scoutDetails: (state) => {
      return state._scoutDetails;
    },
    personalDetails: (state) => {
      return state._personalDetails;
    },
    // isAuth: (state) => {
    //   return state._isAuth;
    // }
  },
});
