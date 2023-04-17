import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../utilities/store'
import { AlertColor } from '@mui/material'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    msg: {
      title: '',
      type: 'info' as AlertColor,
      show: false,
    }
  },
  reducers: {
    showSuccess: (state, action) => {
      state.msg.title = action.payload
      state.msg.type = "success"
      state.msg.show = true
    },
    showError: (state, action) => {
      state.msg.title = action.payload
      state.msg.type = "error"
      state.msg.show = true
    },
    closeMessage: (state) => {
      state.msg.show = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { showSuccess, showError, closeMessage } = mainSlice.actions

export const mainReducer = mainSlice.reducer

export const useMainSelector = () => {
  const selector = useSelector((state: RootState) => state.main)
  return selector
}