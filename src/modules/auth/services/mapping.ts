import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;

export default {
  fetchGenderMappings: async () => {
    return axios.get(`${BASE_URL}/basic/gender/`);
  },

  fetchScoutHierarchyMappings: async () => {
    return axios.get(`${BASE_URL}/basic/scout-hierarchy-detail/?level=5`);
  },

  fetchScoutLevelMappings: async () => {
    return axios.get(`${BASE_URL}/event/choices/scout-level-types/`);
  },
};
