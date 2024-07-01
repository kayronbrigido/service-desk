import { setAuthenticated } from '@src/store/slicers/authSlice'

const AuthService = {
  signin: () => (dispatch: any) => {
    dispatch(setAuthenticated(true));
  }
}

export default AuthService;