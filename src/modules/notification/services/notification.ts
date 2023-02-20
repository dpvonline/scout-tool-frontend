import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = 'auth/notification/'

export default {

  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}all/`, {
      params: params,
    });
  },
  fetchCounts(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}count/`, {
      params: params,
    });
  },
  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/`);
  },
};
