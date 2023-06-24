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

  createEventModule(eventId: any, data: Object) {
    return axios.post(`${BASE_URL}/${SERVICE}/${eventId}/event-module/`, data);
  },
  updateEventModuleById(eventId: any, eventModuleId: any, data: Object) {
    return axios.put(`${BASE_URL}/${SERVICE}/${eventId}/event-module/${eventModuleId}/`, data);
  },
  updatePartialEventModuleById(eventId: any, eventModuleId: any, data: Object) {
    return axios.patch(`${BASE_URL}/${SERVICE}/${eventId}/event-module/${eventModuleId}/`, data);
  },
  deleteEventModule(eventId: any, id: any) {
    return axios.delete(`${BASE_URL}/${SERVICE}/${eventId}/event-module/${id}/`);
  },

  fetchAvailableModules(eventId: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${eventId}/available-modules/`);
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
  updatePartial(data: any) {
    return axios.patch(`${BASE_URL}/${SERVICE}-update-partial/${data.id}/`, data);
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
  fetchCashListSummary(id: any, params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/cash-list/`, {
      params: params,
    });
  },
  fetchCashSummary(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/summary/cash/`);
  },
  fetchCashDetailById(id: any, params: any) {
    return axios.get(`${BASE_URL}/event/registration/${id}/cash-detail/`, {
      params: params,
    });
  },
  sendPaymentReminder(data: any) {
    return axios.post(`${BASE_URL}/event/cash/mail-reminder/`, data);
  },
  sendSinglePaymentReminder(data: any) {
    return axios.post(`${BASE_URL}/event/cash/mail-single-reminder/`, data);
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
  getEventLocationSummary(eventId: any, params: any) {
    const path = `${BASE_URL}/${SERVICE}/${eventId}/summary/event-location/`;
    return axios.get(path, { params });
  },
  getRegistrationLocationsSummary(eventId: any, params: any) {
    const path = `${BASE_URL}/${SERVICE}/${eventId}/summary/participant-locations/`;
    return axios.get(path, { params });
  },
  getHierarchyMappingDetailed() {
    const path = `${BASE_URL}/basic/scout-hierarchy-detail/`;
    return axios.get(path);
  },
};
