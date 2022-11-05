import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = 'keycloak/group'

export default {

  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/`, {
      params: params,
    });
  },
  fetchSearch(params: any) {
    return axios.get(`${BASE_URL}/keycloak/group-search/`, {
      params: params,
    });
  },

  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/`);
  },
  fetchMembersById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/members/`);
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
