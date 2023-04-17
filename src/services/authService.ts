import axios from 'axios'
import { AxiosConfig } from '../utilities/axios'
import { IUser } from '../models/userModel'

export const signinService = async (username: string, password: string) => {
  const values = {
    username,
    password,
  }
  const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/auth/signin`, values, AxiosConfig)
  return response
}

export const signupService = async (values: IUser) => {
  const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/auth/signup`, values, AxiosConfig)
  return response
}