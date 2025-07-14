import axios from 'axios';

import { useAuthStore } from "@/modules/auth/store/index";


export default {
  interceptorsSetup() {
    const authStore = useAuthStore();

    axios.interceptors.request.use(
      async (config) => {
        if (authStore.accessToken) {
          config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );

    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      console.log(error.response.data)
      if (error.response.status === 401) {
        authStore.login()
      }
      return Promise.reject(error)
    })
  },
};
