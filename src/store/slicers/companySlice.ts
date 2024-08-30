import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ICompanyState {
  companies: [] | null,
}

const initialState: ICompanyState = {
  companies: null
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getCompanies: (state, action: PayloadAction<any>) => {
      state.companies = action.payload;
    },
  }
})

export const { getCompanies } = companySlice.actions;
export const companyReducer = companySlice.reducer;