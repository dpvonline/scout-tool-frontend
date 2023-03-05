

import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;

export default {
  fetchScoutOrgaLevel() {
    return axios.get(`${BASE_URL}/basic/scout-orga-level`);
  },
};