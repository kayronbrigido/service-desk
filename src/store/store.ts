import { authReducer } from './slicers/authSlice'
import { companyReducer } from './slicers/companySlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;