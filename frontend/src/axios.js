import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust based on your backend URL
  withCredentials: true,  // This ensures cookies are sent with requests
});

export default axiosInstance;
