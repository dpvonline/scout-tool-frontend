import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;
const SERVICE = "event/files";

export default {
  async getAvailableFileTemplates(params: any) {
    return await axios.get(`${BASE_URL}/${SERVICE}/available-templates/`, {
      params: params,
    });
  },
  async addFileRequest(eventId: any, data: any) {
    const path = `${BASE_URL}/event/event/${eventId}/files/generate/`;
    return await axios.post(path, data);
  },
  async getDownloadSummary(eventId: any, params: any) {
    const path = `${BASE_URL}/event/event/${eventId}/files/generate/`;
    return await axios.get(path, { params });
  },
  async getFileType(eventId: any, params: any) {
    const path = `${BASE_URL}/event/choices/file-type/`;
    return await axios.get(path, { params });
  },
  async getFileGenerationStatus(eventId: any, params: any) {
    const path = `${BASE_URL}/event/choices/file-generation-status/`;
    return await axios.get(path, { params });
  },
  async getFileExtension(eventId: any, params: any) {
    const path = `${BASE_URL}/event/choices/file-extension/`;
    return await axios.get(path, { params });
  },
};
