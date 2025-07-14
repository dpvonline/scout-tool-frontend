import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;

export default {
  fetchGroupCount() {
    return axios.get(`${BASE_URL}/keycloak/statistics/group-count/`);
  },
  fetchUserCount() {
    return axios.get(`${BASE_URL}/keycloak/statistics/user-count/`);
  },
  fetchMyRequests() {
    return axios.get(`${BASE_URL}/auth/my-requests/`);
  },
  fetchMyOwnRequests() {
    return axios.get(`${BASE_URL}/auth/my-own-requests/`);
  },
};
