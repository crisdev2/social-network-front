import { AxiosRequestConfig } from 'axios';

export const AxiosConfig: AxiosRequestConfig = {
  headers: {
    Authorization: localStorage.getItem('access_token') ? 
      `Bearer ${localStorage.getItem('access_token')}` : undefined
  },
  validateStatus: function (status) {
    return status < 500
  }
}