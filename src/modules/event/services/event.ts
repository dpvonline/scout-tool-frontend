import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = "event/event";

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
  fetchAllOverviews(params: any = {}) {
    return axios.get(`${BASE_URL}/${SERVICE}-overview/`, {
      params: params,
    });
  },
  fetchBookingOptionsById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/booking-options/`);
  },
  fetchBookingOptionsByBookingId(eventId: any, bookingId: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${eventId}/booking-options/${bookingId}/`);
  },
  createBookingOption(eventId: any, data: Object) {
    return axios.post(`${BASE_URL}/${SERVICE}/${eventId}/booking-options/`, data);
  },
  updateBookingOptionById(eventId: any, bookingId: any, data: Object) {
    return axios.put(`${BASE_URL}/${SERVICE}/${eventId}/booking-options/${bookingId}/`, data);
  },
  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-read/${id}/`);
  },
  fetchTechById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/`);
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
  fetchEventSummary(id: any, params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/`, {
      params: params,
    });
  },
  fetchEventSummaryTotalParticipants(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/kpi/total-participants/`);
  },
  fetchEventSummaryTotalRegistrations(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/kpi/total-registrations/`);
  },
  fetchEventSummaryBookingOptions(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/kpi/booking-options/`);
  },
  fetchFoodSummary(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/food/`);
  },
  fetchAgeGroupsSummary(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/age-groups/`);
  },
  fetchAttributesSummary(id: any, params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/attributes/`, {
      params: params,
    });
  },
  fetchCashSummary(id: any, params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/cash/`, {
      params: params,
    });
  },
  fetchPersonsSummary(id: any, params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/detailed/`, {
      params: params,
    });
  },
  fetchAvailableTemplates(id: any, params: any) {
    return axios.get(`${BASE_URL}/event/files/available-templates/`);
  },
  createFileRequest(eventId: any, data: any) {
    return axios.post(`${BASE_URL}/event/event/${eventId}/files/generate/`, data);
  },
  fetchDownloadSummary(eventId: any, params: any) {
    return axios.get(`${BASE_URL}/event/event/${eventId}/files/generate/`, { params });
  },
};
