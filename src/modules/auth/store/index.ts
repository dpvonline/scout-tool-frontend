import { defineStore } from "pinia"
import { keycloak } from "@/modules/auth/keycloak"
import { useStorage } from "@vueuse/core"
import mappingServices from "@/modules/auth/services/mapping"
import registerServices from "../services/register"
import checkingServices from "../services/checking"

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
    login() {
      keycloak.login()
    },
    logout() {
      keycloak.logout()
    },
  },

  getters: {
    accessToken: (state) => {
      return state._accessToken
    },
    refreshToken: (state) => {
      return state._refreshToken
    },
    user: (state) => {
      return state._user
    },
    isAuth: (state) => {
      return state._isAuth
    },
    isAdmin: (state) => {
      return state._isAdmin
    },
    isKeycloakInit: (state) => {
      return state._isKeycloakInit
    },
  },
})

export const useRegisterStore = defineStore("registerStore", {
  state: () => ({
    _registered: false,
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
    reset() {
      this.updateBasics({
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
      })
      this.updateScoutDetails({
        scoutName: "",
        scoutOrganisation: "",
        scoutLevel: "",
      })
      this.updatePersonalDetails({
        mobileNumber: "",
        dsgvoConfirmed: false,
        firstName: "",
        lastName: "",
        address: "",
        addressSupplement: "",
        zipCode: "",
        gender: "",
        birthdate: "",
      })
    },
    setRegistered() {
      this._registered = true
    },
    async fetchAllMappings(params = {}) {
      try {
        const genders = await mappingServices.fetchGenderMappings()
        this._mappings.gender = genders.data
      } catch (e) {
        alert(e)
        console.error(e)
      }

      try {
        const scoutHierarchy = await mappingServices.fetchScoutHierarchyMappings()
        this._mappings.scoutHierarchy = scoutHierarchy.data
      } catch (e) {
        alert(e)
        console.error(e)
      }
      try {
        const scoutLevel = await mappingServices.fetchScoutLevelMappings()
        this._mappings.scoutLevel = scoutLevel.data
      } catch (e) {
        alert(e)
        console.error(e)
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
        scoutLevel: this._userdata.scoutDetails.scoutLevel.value,
      }

      return registerServices.register(summary)
    },
    updateBasics(basics: typeof this._userdata.basics) {
      this._userdata.basics = basics
    },
    updateScoutDetails(scoutDetails: typeof this._userdata.scoutDetails) {
      this._userdata.scoutDetails = scoutDetails
    },
    updatePersonalDetails(personalDetails: typeof this._userdata.personalDetails) {
      this._userdata.personalDetails = personalDetails
    },
    async usernameAlreadyTaken(username: string): Promise<boolean> {
      //todo for some reason every request with error status is printed to console
      try {
        await checkingServices.usernameIsAlreadyTaken(username)
        return false
      } catch (e) {
        if (e.request.status === 409) {
          return true
        }
        console.error("e" + e)
        //todo what do here? (user should know something about the situation)
        return false
      }
    },
  },
  getters: {
    basics: (state) => {
      return state._userdata.basics
    },
    scoutDetails: (state) => {
      return state._userdata.scoutDetails
    },
    personalDetails: (state) => {
      return state._userdata.personalDetails
    },
    genderMappings: (state) => {
      return state._mappings.gender
    },
    scoutHierarchyMappings: (state) => {
      return state._mappings.scoutHierarchy
    },
    scoutLevelMappings: (state) => {
      return state._mappings.scoutLevel
    },
    registered: (state) => {
      return state._registered
    },
    // isAuth: (state) => {
    //   return state._isAuth;
    // }
  },
})
