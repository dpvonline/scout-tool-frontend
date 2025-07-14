import axios from "axios"
const BASE_URL = import.meta.env.VITE_APP_API;

export default {
    async register (data: any) {
        return axios.post(`${BASE_URL}/auth/register/`, data)
    }
}