import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = "keycloak/group";
const MODULE = "keycloak";

export default {
  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/`, {
      params: params,
    });
  },
  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/`);
  },
  sendGroupInvitation(groupId: any, userId: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${groupId}/invite/`, { userId });
  },
  sendGroupKick(groupId: any, userId: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${groupId}/kick/`, { userId });
  },
  sendGroupLeave(groupId: any, userId: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${groupId}/leave/`, { userId });
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
  fetchGroupCount() {
    return axios.get(`${BASE_URL}/keycloak/statistics/user-count/`);
  },
  fetchMyGroups() {
    return axios.get(`${BASE_URL}/auth/my-groups/`);
  },
  fetchGroupUserAdmins(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/user-admins/`);
  },
  fetchGroupAdmins(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/group-admins/`);
  },
};
