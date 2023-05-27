import { defineStore } from "pinia"
import { keycloak } from "@/modules/auth/keycloak"
import { useStorage } from "@vueuse/core"
import { useRouter } from 'vue-router'
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
    login(init : boolean = false) {
      const router = useRouter()
      var currentLocation = window.location;

      const APP_URL = import.meta.env.VITE_APP_URL;
      let loginOptions = { redirectUri: `${APP_URL}/dashboard` };
      if (currentLocation?.pathname !== '/landing') {
        loginOptions = { redirectUri: `${APP_URL}${currentLocation?.pathname}` };
      }

      if (init) {
        keycloak.login(loginOptions)
      } else {
        keycloak.login()
      }
    },
    logout() {
      const APP_URL = import.meta.env.VITE_APP_URL;
      const logoutOptions = { redirectUri: `${APP_URL}/landing` };
      keycloak.logout(logoutOptions)
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
      scoutGroup: [],
      scoutLevel: [],
      eatHabit: [],
    }),

    _userdata: {
      account: useStorage("account", {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
      }),
      scout: useStorage("scout", {
        scoutName: "",
        scoutGroup: null,
        scoutLevel: "",
      }),
      personal: useStorage("personal", {
        phoneNumber: "",
        gender: "",
        birthday: "",
      }),
      advancedPersonal: useStorage("advancedPersonal", {
        firstName: "",
        lastName: "",
        address: "",
        addressSupplement: "",
        zipCode: "",
      }),
    },
  }),
  actions: {
    reset() {
      this.updateAccount({
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
      })
      this.updateScout({
        scoutName: "",
        scoutGroup: null,
        scoutLevel: "",
      })
      this.updatePersonal({
        phoneNumber: "",
        gender: "N",
        birthday: "",
      })
      this.updateAdvancedPersonal({
        firstName: "",
        lastName: "",
        address: "",
        addressSupplement: "",
        zipCode: "",
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
        const scoutGroup = await mappingServices.fetchScoutGroupMapping()
        this._mappings.scoutGroup = scoutGroup.data
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
      try {
        const eatHabit = await mappingServices.fetchEatHabit()
        this._mappings.eatHabit = eatHabit.data
      } catch (e) {
        alert(e)
        console.error(e)
      }
    },
    register() {
      const summary = {
        // start
        dsgvoConfirmed: true,
        // account
        username: this._userdata.account.username,
        password: this._userdata.account.password,
        email: this._userdata.account.email,

        // scout
        scoutName: this._userdata.scout.scoutName,
        scoutGroup: this._userdata.scout.scoutGroup?.id,

        // personal
        birthday: this._userdata.personal.birthday,
        gender: this._userdata.personal.gender,
        phoneNumber: this._userdata.personal.phoneNumber,

        // advanced-personal
        firstName: this._userdata.advancedPersonal.firstName,
        lastName: this._userdata.advancedPersonal.lastName,
        address: this._userdata.advancedPersonal.address,
        zipCode: this._userdata.advancedPersonal.zipCode,
      }

      return registerServices.register(summary)
    },
    updateAccount(account: typeof this._userdata.account) {
      this._userdata.account = account
    },
    updateScout(scout: typeof this._userdata.scout) {
      this._userdata.scout = scout
    },
    updatePersonal(personal: typeof this._userdata.personal) {
      this._userdata.personal = personal
    },
    updateAdvancedPersonal(advancedPersonal: typeof this._userdata.advancedPersonal) {
      this._userdata.advancedPersonal = advancedPersonal
    },
    async usernameCheck(username: string): Promise<boolean> {
      //todo for some reason every request with error status is printed to console
      try {
        await checkingServices.usernameCheck(username)
        return false
      } catch (e) {
        if (e.request.status === 400) {
          return true
        }
        if (e.request.status === 409) {
          return true
        }
        console.error("e" + e)
        //todo what do here? (user should know something about the situation)
        return false
      }
    },
    async emailCheck(email: string): Promise<boolean> {
      //todo for some reason every request with error status is printed to console
      try {
        await checkingServices.emailCheck(email)
        return false
      } catch (e) {
        if (e.request.status === 400) {
          return true
        }
        if (e.request.status === 409) {
          return true
        }
        console.error("e" + e)
        //todo what do here? (user should know something about the situation)
        return false
      }
    },
    async zipCheck(zipCode: string): Promise<boolean> {
      //todo for some reason every request with error status is printed to console
      try {
        await checkingServices.zipCodeCheck(zipCode)
        return false
      } catch (e) {
        if (e.request.status === 400) {
          return true
        }
        if (e.request.status === 409) {
          return true
        }
        console.error("e" + e)
        //todo what do here? (user should know something about the situation)
        return false
      }
    },
    async passwordCheck(password: string): Promise<boolean> {
      //todo for some reason every request with error status is printed to console
      try {
        await checkingServices.passwordCheck(password)
        return false
      } catch (e) {
        if (e.request.status === 400) {
          return true
        }
        console.error("e" + e)
        //todo what do here? (user should know something about the situation)
        return false
      }
    },
  },
  getters: {
    // register
    registered: (state) => {
      return state._registered
    },

    // register-data
    account: (state) => {
      return state._userdata.account
    },
    scout: (state) => {
      return state._userdata.scout
    },
    personal: (state) => {
      return state._userdata.personal
    },
    advancedPersonal: (state) => {
      return state._userdata.advancedPersonal
    },

    // mappings
    genderMappings: (state) => {
      return state._mappings.gender
    },
    scoutGroupMappings: (state) => {
      return state._mappings.scoutGroup
    },
    scoutLevelMappings: (state) => {
      return state._mappings.scoutLevel
    },
    eatHabitMappings: (state) => {
      return state._mappings.eatHabit
    },
  },
})
