import { defineStore } from "pinia";

import GroupApi from "@/modules/group/services/group";


export const useGroupStore = defineStore("group", {
  state: () => ({
    _groups: [],
    _groupsOverview: [],
    _group: [],
    _groupMembers: [],
  }),

  actions: {
    async fetchGroups(params = {}) {
      try {
        const response = await GroupApi.fetchAll(params);
        this._groups = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchGroupsOverview(params = {}) {
      try {
        const response = await GroupApi.fetchSearch(params);
        this._groupsOverview = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchGroupById(id: number) {
      try {
        const response = await GroupApi.fetchById(id);
        this._group = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchGroupMembersById(id: number) {
      try {
        const response = await GroupApi.fetchMembersById(id);
        this._groupMembers = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  getters: {
    groups: (state) => {
      return state._groups;
    },
    group: (state) => {
      return state._group;
    },
    groupMembers: (state) => {
      return state._groupMembers;
    },
    groupsOverview: (state) => {
      return state._groupsOverview;
    },
  },
});
