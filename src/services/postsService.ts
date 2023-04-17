import axios from 'axios'
import { AxiosConfig } from '../utilities/axios'
import { IPosts } from '../models/postsModel'

export const postsSaveService = async (values: IPosts) => {
  let response;
  if (values.id) {
    response = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/posts/${values.id}`, values, AxiosConfig)
  } else {
    response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/posts`, values, AxiosConfig)
  }
  return response
}

export const postsDeleteService = async (id: number) => {
  const response = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/posts/${id}`, AxiosConfig)
  return response
}

export const postsShowService = async (id: number) => {
  const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/posts/${id}`, AxiosConfig)
  return response
} 