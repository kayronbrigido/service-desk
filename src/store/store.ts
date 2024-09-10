import { authReducer } from './slicers/authSlice'
import { companyReducer } from './slicers/companySlice';
import { configureStore } from '@reduxjs/toolkit'
import { loadingReducer } from './slicers/loadingSlice';
import { userReducer } from './slicers/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    loading: loadingReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;