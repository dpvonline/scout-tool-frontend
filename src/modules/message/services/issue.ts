import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = 'message/issue'

export default {
  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-read/`, {
      params: params,
    });
  },
  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-read/${id}/`);
  },
  create(data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}-init-create/`, data );
  },
  update(data: any) {
    return axios.put(`${BASE_URL}/${SERVICE}/${data.id}/`, data);
  },
  delete(id: any) {
    return axios.delete(`${BASE_URL}/${SERVICE}/${id}/`)
  },
};
