

import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;

export default {
  fetchScoutOrgaLevel() {
    return axios.get(`${BASE_URL}/basic/scout-orga-level`);
  },
  fetchTravelTypeChoices() {
    return axios.get(`${BASE_URL}/event/travel-type-choices/`);
  },
  fetchAttributeChoices() {
    return axios.get(`${BASE_URL}/event/attribute-choices/`);
  },
  fetchGenderMappings: async () => {
    return axios.get(`${BASE_URL}/basic/gender/`);
  },
  fetchScoutGroupMapping: async (levelId=5) => {
    return axios.get(`${BASE_URL}/basic/scout-hierarchy-detail/?level=${levelId}`);
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