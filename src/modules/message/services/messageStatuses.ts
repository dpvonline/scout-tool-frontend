import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = 'message/message-statuses'

export default {
  fetchAll() {
    return axios.get(`${BASE_URL}/${SERVICE}/`);
  },
};
