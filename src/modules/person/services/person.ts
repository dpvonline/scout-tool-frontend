import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = 'keycloak/person'

export default {
  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/keycloak/group/f25c6d30-77ee-4b9a-9c78-70e2e1379180/members/`, {
      params: params,
    });
  },

  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/`);
  },

  create(data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/`, data );
  },

  update(data: any) {
    return axios.put(`${BASE_URL}/${SERVICE}/${data.id}/`, data);
  },

  delete(id: any) {
    return axios.delete(`${BASE_URL}/${SERVICE}/${id}/`)
  },
};
