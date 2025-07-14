import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = 'auth/my-members'

export default {
  fetchAll(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/`, {
      params: params,
    });
  },

  fetchById(id: any) {
    return axios.get(`${BASE_URL}/${SERVICE}/${id}/`);
  },
  fetchAddable(params: any) {
    return axios.get(`${BASE_URL}/${SERVICE}-addable/`, {
      params,
    });
  },

  create(data: any) {
    return axios.post(`${BASE_URL}/${SERVICE}/`, data );
  },

  update(data: any) {
    return axios.put(`${BASE_URL}/${SERVICE}/${data.id}/`, data);
  },

  delete(id: any) {
    return axios.delete(`${BASE_URL}/${SERVICE}/${id}/`)
  },
  uploadFile(file: File) {
    return axios.post(`${BASE_URL}/${SERVICE}-upload/`, file, { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
};
