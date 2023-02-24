import { defineStore } from "pinia";

import personApi from "@/modules/person/services/person";
import userApi from "@/modules/person/services/user";


export const usePersonStore = defineStore("person", {
  state: () => ({
    _persons: [],
    _person: {},
    _users: [],
    _user: {},
    _isLoading: false
  }),

  actions: {
    async fetchPersons(params = {}) {
      this._isLoading = true;
      try {
        const response = await personApi.fetchAll(params);
        this._persons = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchPersonById(id: number) {
      this._isLoading = true;
      this._person = [];
      try {
        const response = await personApi.fetchById(id);
        this._person = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchUsers(params = {}) {
      this._isLoading = true;
      try {
        const response = await userApi.fetchAll(params);
        this._users = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchUserById(id: number) {
      this._isLoading = true;
      try {
        const response = await userApi.fetchById(id);
        this._user = response.data;
        this._isLoading = false;
      } catch (error) {
        // alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
  },
  getters: {
    persons: (state) => {
      return state._persons;
    },
    person: (state) => {
      return state._person;
    },
    users: (state) => {
      return state._users;
    },
    user: (state) => {
      return state._user;
    },
    isLoading: (state) => {
      return state._isLoading;
    },
  },
});
