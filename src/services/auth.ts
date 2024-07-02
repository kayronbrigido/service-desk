import AuthAPI from '@src/endpoints/auth/auth';
import { SessionStorageKey } from '@src/models/enums';
import { setAuthenticated } from '@src/store/slicers/authSlice'


const AuthService = {
  signin: (login: string, password: string, callback = (err: Error | null) => {}) => async (dispatch: any) => {

    try{
      const { user } = await AuthAPI.signin(login, password);
      const idToken = await user.getIdToken()

      sessionStorage.setItem(SessionStorageKey.ACCESS_TOKEN, idToken)

      dispatch(setAuthenticated(true));
      callback(null);
    } catch(e) {
      callback(e as Error)
    }
  }
}

export default AuthService;