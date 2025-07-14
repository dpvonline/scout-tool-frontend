import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = "event/event";

export default {
async getRegistrationsResponsiblePersons(eventId: any, params: any,) {
    const path = `${BASE_URL}/${SERVICE}/${eventId}/summary/emails/registration-responsible-persons/`;
    return axios.get(path, { params });
  },
}