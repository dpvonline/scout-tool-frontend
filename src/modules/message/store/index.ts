import { defineStore } from "pinia";

import MessageApi from "@/modules/message/services/message";
import IssueTypeApi from "@/modules/message/services/issueType";
import IssueApi from "@/modules/message/services/issue";
import MessagePrioApi from "@/modules/message/services/messagePrio";

export const useMessageStore = defineStore("message", {
  state: () => ({
    _messages: [],
    _message: {},
    _issues: [],
    _issue: {},
    _issueTypes: [],
    _issueType: {},
    _isLoading: false,
    _messagePrios: [],
  }),

  actions: {
    // Message
    async fetchMessages(params = {}) {
      this._isLoading = true;
      this._messages = [];
      try {
        const response = await MessageApi.fetchAll(params);
        this._messages = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchMessage(id: number) {
      this._message = [];
      this._isLoading = true;
      try {
        const response = await MessageApi.fetchById(id);
        this._message = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    // Issue
    async fetchIssues(params = {}) {
      this._isLoading = true;
      this._issues = [];
      try {
        const response = await IssueApi.fetchAll(params);
        this._issues = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    async fetchIssue(params = {}) {
      this._isLoading = true;
      this._issue = {};
      try {
        const response = await IssueApi.fetchById(params);
        this._issue = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    // Issue Type
    async fetchIssueTypes(params = {}) {
      try {
        const response = await IssueTypeApi.fetchAll(params);
        this._issueTypes = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchIssueTypesShort(params = {}) {
      try {
        const response = await IssueTypeApi.fetchAllShorts(params);
        this._issueTypes = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchIssueTypeById(id: number) {
      this._issueType = {};
      this._isLoading = true;
      try {
        const response = await IssueTypeApi.fetchById(id);
        this._issueType = response.data;
        this._isLoading = false;
      } catch (error) {
        alert(error);
        console.log(error);
        this._isLoading = false;
      }
    },
    // message-prio
    async fetchMessagePrio() {
      try {
        const response = await MessagePrioApi.fetchAll();
        this._messagePrios = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async createIssue(data: object) {
      try {
        return await IssueApi.create(data);
      } catch (error) {
        if (error.response.status === 400) {
          // commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          // commonStore.showError('Schwerer Server Fehler');
        }
      }
    },
    async createMessage(data: object) {
      try {
        debugger;
        return await MessageApi.create(data);
      } catch (error) {
        debugger;
        if (error?.response?.status === 400) {
          // commonStore.showError(error.response.data);
        } else if (error?.response?.status === 500) {
          // commonStore.showError('Schwerer Server Fehler');
        }
      }
    },
    async updateMessage(data: object) {
      try {
        return await MessageApi.update(data);
      } catch (error: any) {
        if (error.response.status === 400) {
          // commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
          // commonStore.showError('Schwerer Server Fehler');
        }
      }
    },
  },
  getters: {
    messages: (state) => {
      return state._messages;
    },
    unProcessedMessages: (state) => {
      return state._messages.length
    },
    message: (state) => {
      return state._message;
    },
    issue: (state) => {
      return state._issue;
    },
    issues: (state) => {
      return state._issues;
    },
    issueTypes: (state) => {
      return state._issueTypes;
    },
    issueType: (state) => {
      return state._issueType;
    },
    isLoading: (state) => {
      return state._isLoading;
    },
    messagePrios: (state) => {
      return state._messagePrios;
    },
  },
});
