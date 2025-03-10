import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  withCredentials: true
});

request.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(new Error('网络连接异常'));
  }
);

export default request;