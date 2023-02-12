import { defineStore } from "pinia";

import MessageApi from "@/modules/message/services/messagePrio";
import issueTypeApi from "@/modules/message/services/issueType";

export const useMessageStore = defineStore("message", {
  state: () => ({
    _messages: [],
    _message: {},
    _issueTypes: {},
  }),

  actions: {
    async fetchMessages(params = {}) {
      try {
        const response = await MessageApi.fetchAll(params);
        this._messages = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchIssueTypes(params = {}) {
      try {
        const response = await issueTypeApi.fetchAll(params);
        this._issueTypes = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchMessage(id: number) {
      try {
        const response = await MessageApi.fetchById(id);
        this._message = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async createMessage(data: object) {
      try {
        return await MessageApi.create(data);
      } catch (error) {
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
      return state._messages.filter(item => item?.isProcessed === false).length;
    },
    message: (state) => {
      return state._message;
    },
    issueTypes: (state) => {
      return state._issueTypes;
    },
  },
});
