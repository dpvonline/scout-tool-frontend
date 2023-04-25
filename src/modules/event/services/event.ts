import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = 'event/event'

export default {
  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-read/`, {
      params: params,
    });
  },
  fetchMyEvents(params: any) {
    return axios.get(`${BASE_URL}/my-events/`, {
      params: params,
    });
  },
  fetchMyInvitations(params: any) {
    return axios.get(`${BASE_URL}/event/my-invitations/`, {
      params: params,
    });
  },
  fetchAllOverviews(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-overview/`, {
      params: params,
    });
  },
  fetchBookingOptionsById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/booking-options/`);
  },
  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-read/${id}/`);
  },
  fetchTechById(id: any) {
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
