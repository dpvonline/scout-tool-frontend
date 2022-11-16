import axios from "axios"
const BASE_URL = import.meta.env.VITE_APP_API

export default {
  async usernameIsAlreadyTaken(username: string) {
    return axios.post(`${BASE_URL}/auth/check-username/`, { username })
  },
}
