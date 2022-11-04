import axios from 'axios';

import { useAuthStore } from "@/modules/auth/store/index.ts";


export default {
  interceptorsSetup() {
    const authStore = useAuthStore();
    console.log(authStore.accessToken)
    axios.interceptors.request.use(
      async (config) => {
        if (authStore.accessToken) {
          config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );
  },
};
