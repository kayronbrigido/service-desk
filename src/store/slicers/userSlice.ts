import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserData } from "@src/models/auth";

interface IUserState {
  loggedUser: null | IUserData
}

const initialState: IUserState = {
  loggedUser: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<IUserData>) => {
      state.loggedUser = action.payload
    }
  }
})

export const { setLoggedUser } = userSlice.actions
export const userReducer = userSlice.reducer