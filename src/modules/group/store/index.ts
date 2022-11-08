import { defineStore } from "pinia";

import GroupApi from "@/modules/group/services/group";

export const useGroupStore = defineStore("group", {
  state: () => ({
    _groups: [],
    _groupsOverview: [],
    _group: [],
    _groupMembers: [],
    _groupCount: 0,
    _requests: [],
    _myGroups: [],
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
    async fetchRequestById(id: number) {
      try {
        const response = await GroupApi.fetchRequestById(id);
        this._requests = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async sendGroupRequest(id: number) {
      try {
        return await GroupApi.sendGroupRequest(id);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async sendAcceptRequest(groupId: number, requestId: number) {
      try {
        return await GroupApi.sendAcceptRequest(groupId, requestId);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async sendDeclineRequest(groupId: number, requestId: number) {
      try {
        return await GroupApi.sendDeclineRequest(groupId, requestId);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchGroupCount() {
      try {
        const response = await GroupApi.fetchGroupCount();
        this._groupCount = response.data.count;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchMyGroups() {
      try {
        const response = await GroupApi.fetchMyGroups();
        this._myGroups = response.data;
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
    groupCount: (state) => {
      return state._groupCount;
    },
    requests: (state) => {
      return state._requests;
    },
    myGroups: (state) => {
      return state._myGroups;
    },
  },
});
