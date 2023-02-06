import { defineStore } from "pinia";

import GroupApi from "@/modules/group/services/group";

export const useGroupStore = defineStore("group", {
  state: () => ({
    _isLoading: true,
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
      this._isLoading = true;
      this._groups = [];
      try {
        const response = await GroupApi.fetchAll(params);
        this._groups = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchGroupById(id: number) {
      this._isLoading = true;
      this._group = [];
      try {
        const response = await GroupApi.fetchById(id);
        this._group = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchGroupMembersById(id: number) {
      this._isLoading = true;
      this._groupMembers = [];
      try {
        const response = await GroupApi.fetchMembersById(id);
        this._groupMembers = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchRequestById(id: number) {
      this._isLoading = true;
      this._requests = [];
      try {
        const response = await GroupApi.fetchRequestById(id);
        this._requests = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
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
      this._isLoading = true;
      this._myGroups = [];
      try {
        const response = await GroupApi.fetchMyGroups();
        this._myGroups = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
  },
  getters: {
    isLoading: (state) => {
      return state._isLoading;
    },
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
