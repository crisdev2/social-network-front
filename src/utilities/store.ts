import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from '../features/userSlice'
import { mainReducer } from '../features/mainSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    main: mainReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch