import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILoggerUserData } from "@src/models/auth";

interface IUserState {
  loggedUser: null | ILoggerUserData
}

const initialState: IUserState = {
  loggedUser: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<ILoggerUserData>) => {
      state.loggedUser = action.payload
    }
  }
})

export const { setLoggedUser } = userSlice.actions
export const userReducer = userSlice.reducer