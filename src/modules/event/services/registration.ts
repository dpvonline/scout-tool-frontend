import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = "event/registration";

export default {
  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-read/`, {
      params: params,
    });
  },
  fetchMyRegistrations(params: any) {
    return axios.get(`${BASE_URL}/event/my-registrations/`, {
      params: params,
    });
  },
  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-read/${id}/`);
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
  createParticipant(id: any, data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/single-participant/`, data);
  },
  updateParticipant(regId: any, personId: any, data: any) {
    return axios.put(`${BASE_URL}/${SERVICE}/${regId}/single-participant/${personId}/`, data);
  },
  deleteParticipant(regId: any, id: any) {
    return axios.delete(`${BASE_URL}/${SERVICE}/${regId}/single-participant/${id}`);
  },

  createBooleanAttribute(id: any, data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/boolean-attribute/`, data);
  },
  createStringAttribute(id: any, data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/string-attribute/`, data);
  },
  createTravelAttribute(id: any, data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/travel-attribute/`, data);
  },
  createFloatAttribute(id: any, data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/float-attribute/`, data);
  },
  createDateTimeAttribute(id: any, data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/date-time-attribute/`, data);
  },
  createIntegerAttribute(id: any, data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/integer-attribute/`, data);
  },

  updateBooleanAttribute(id: any, data: any) {
    return axios.put(`${BASE_URL}/event/boolean-attribute/${id}/`, data);
  },
  updateStringAttribute(id: any, data: any) {
    return axios.put(`${BASE_URL}/event/string-attribute/${id}/`, data);
  },
  updateTravelAttribute(id: any, data: any) {
    return axios.put(`${BASE_URL}/event/travel-attribute/${id}/`, data);
  },
  updateFloatAttribute(id: any, data: any) {
    return axios.put(`${BASE_URL}/event/float-attribute/${id}/`, data);
  },
  updateDateTimeAttribute(id: any, data: any) {
    return axios.put(`${BASE_URL}/event/date-time-attribute/${id}/`, data);
  },
  updateIntegerAttribute(id: any, data: any) {
    return axios.put(`${BASE_URL}/event/integer-attribute/${id}/`, data);
  },

  sendConfirmMail(id: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/send-confirmation-mail/`);
  },
  createRating(id: any, data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/${id}/registration-rating/`, data);
  },
};
