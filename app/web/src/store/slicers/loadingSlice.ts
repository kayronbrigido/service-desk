import { createSlice } from '@reduxjs/toolkit';

interface ILoadinState {
  loading?: boolean
}
const initialState: ILoadinState = {
  loading: false
}

let loadingCounter = 0;

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      loadingCounter++
      state.loading = loadingCounter > 1
    },
    stopLoading: (state) => {
      loadingCounter--
      state.loading = loadingCounter > 1
    }
  }
});

export const { startLoading, stopLoading } = loadingSlice.actions
export const loadingReducer = loadingSlice.reducer;