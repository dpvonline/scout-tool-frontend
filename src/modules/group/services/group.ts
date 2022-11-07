import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = "keycloak/group";

export default {
  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/`, {
      params: params,
    });
  },
  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/`);
  },
  fetchRequestById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/requests/`);
  },
  sendGroupRequest(id: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/requests/`);
  },
  sendDeclineRequest(groupId: any, requestId: number) {
    return axios.post(`${BASE_URL}/${SERVICE}/${groupId}/requests/${requestId}/decline/`);
  },
  sendAcceptRequest(groupId: any, requestId: number) {
    return axios.post(`${BASE_URL}/${SERVICE}/${groupId}/requests/${requestId}/accept/`);
  },
  fetchMembersById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/members/`);
  },
  create(data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/`, data);
  },

  update(data: any) {
    return axios.put(`${BASE_URL}/${SERVICE}/${data.id}/`, data);
  },

  delete(id: any) {
    return axios.delete(`${BASE_URL}/${SERVICE}/${id}/`);
  },
};
