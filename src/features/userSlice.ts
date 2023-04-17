import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../utilities/store'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: 0,
    username: "Anonymous",
    role: "",
    image: "",
    isAuthenticated: null as boolean | null
  },
  reducers: {
    login: (state, { payload }) => {
      state.id = payload.sub
      state.username = payload.username
      state.role = payload.role
      state.image = payload.image
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.id = 0
      state.username = "Anonymous"
      state.role = ""
      state.image = ""
      state.isAuthenticated = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export const userReducer = userSlice.reducer

export const useUserSelector = () => {
  const selector = useSelector((state: RootState) => state.user)
  return selector
}