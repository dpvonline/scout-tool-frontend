import { defineStore } from "pinia";
import { keycloak } from "@/modules/auth/keycloak";
import { KeycloakProfile } from "keycloak-js";
import { RegisterBasics, RegisterPersonalDetails, RegisterScoutDetails } from "../views/slides/types";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    _accessToken: <string | undefined>"",
    _refreshToken: <string | undefined>"",
    _user: <{} | undefined>{},
    _isAuth: <boolean | undefined>false,
    _isAdmin: <boolean | undefined>false,
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
  },
});

export const useRegisterStore = defineStore("registerStore", {
  state: () => ({
    _basics: {
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
    },
    _scoutDetails: {
        scoutName: "",
        scoutOrganisation: 0,
        bundespost: "",
        leader: "",
        scoutLevel: ""
    },
    _personalDetails: {
        mobileNumber: 0,
        dsgvoConfirmed: false,
        emailNotification: "",
        smsNotification: false,
        firstName: "",
        lastName: "",
        address: "",
        addressSupplement: "",
        zipCode: 0,
        gender: "",
        birthDate: "",
    }
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
    }
  },
});
