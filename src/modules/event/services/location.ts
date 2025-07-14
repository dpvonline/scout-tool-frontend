import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = "event/event-location";

export default {
  async fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/`, {
      params: params,
    });
  },
  async fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/`);
  },
  async create(data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/`, data);
  },
  async update(data: any) {
    return axios.put(`${BASE_URL}/${SERVICE}/${data.id}/`, data);
  },
  async delete(id: any) {
    return axios.delete(`${BASE_URL}/${SERVICE}/${id}/`);
  },
};
