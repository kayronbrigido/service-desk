import AuthAPI from '@src/endpoints/auth/auth';
import { ICreateUserPayload } from '@src/models/auth';
import RolesAPI from '@src/endpoints/roles/roles';
import { SessionStorageKey } from '@src/models/enums';
import { setAuthenticated } from '@src/store/slicers/authSlice'
import UserAPI from '@src/endpoints/users/users';


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
  },

  createUser: (
    userData: ICreateUserPayload,
    callback = (err: Error | null) => {}) => async (dispatch: any) => {
    
    let user = null;
    
    try {
        
      const userCreated = await AuthAPI.createUser(userData.login as string, userData.password as string);
      user = userCreated.user
        
      await UserAPI.createUser(user.uid, userData)
      
      // dispatch();
      callback(null)
    } catch (error) {
      callback(error as Error)
    }
  }
}

export default AuthService;