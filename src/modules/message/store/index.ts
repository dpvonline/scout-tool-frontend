import { defineStore } from "pinia";

import MessageApi from "@/modules/message/services/message";
import MessageTypeApi from "@/modules/message/services/messageType";

export const useMessageStore = defineStore("message", {
  state: () => ({
    _messages: [],
    _message: {},
    _messageTypes: {},
    _isLoading: false
  }),

  actions: {
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
    async fetchMessageTypes(params = {}) {
      try {
        const response = await MessageTypeApi.fetchAll(params);
        this._messageTypes = response.data;
      } catch (error) {
        alert(error);
        console.log(error);
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
    async createMessageIntern(data: object) {
      try {
        return await MessageApi.createIntern(data);
      } catch (error) {
        if (error.response.status === 400) {
          // commonStore.showError(error.response.data);
        } else if (error.response.status === 500) {
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
      return state._messages.filter(item => item?.isProcessed === false).length;
    },
    message: (state) => {
      return state._message;
    },
    messageTypes: (state) => {
      return state._messageTypes;
    },
    isLoading: (state) => {
      return state._isLoading;
    },
  },
});
