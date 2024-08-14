import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/users',
})

export default axiosInstance
