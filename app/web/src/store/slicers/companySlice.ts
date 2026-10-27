import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICompanyData } from '@src/models/company';

export interface ICompanyState {
  companies: {
    data: ICompanyData[] | null,
    currentPage: number | null,
    totalPages: number | null
  } | null,
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