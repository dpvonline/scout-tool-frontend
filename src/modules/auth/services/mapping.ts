import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;

export default {
  fetchGenderMappings: async () => {
    return axios.get(`${BASE_URL}/basic/gender/`);
  },
  fetchScoutGroupMapping: async () => {
    return axios.get(`${BASE_URL}/basic/scout-hierarchy-detail/?level=5`);
  },
  fetchThemes: async () => {
    return axios.get(`${BASE_URL}/basic/theme/`);
  },
  fetchScoutLevelMappings: async () => {
    return axios.get(`${BASE_URL}/event/choices/scout-level-types/`);
  },
  fetchDjangoGroups: async () => {
    return axios.get(`${BASE_URL}/auth/groups/`);
  },
  fetchScoutOrgaLevel() {
    return axios.get(`${BASE_URL}/basic/scout-orga-level`);
  },
  fetchEatHabit() {
    return axios.get(`${BASE_URL}/basic/eat-habits`);
  },
  fetchEmailSets() {
    return axios.get(`${BASE_URL}/event/email-sets`);
  },
  fetchEventLocations() {
    return axios.get(`${BASE_URL}/event/event-location`);
  },
};
