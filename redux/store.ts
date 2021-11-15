import { configureStore } from '@reduxjs/toolkit'
import { emptySplitApi } from '../services'
import authReducer from '../redux/slices/authSlice'
import notificationReducer from '../redux/slices/notificationSlice'

export const store = configureStore({
  reducer: {
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    auth: authReducer,
    notification: notificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptySplitApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
