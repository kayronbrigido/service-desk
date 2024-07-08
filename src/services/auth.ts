import AuthAPI from '@src/endpoints/auth/auth';
import { ICreateUserPayload } from '@src/models/auth';
import RolesAPI from '@src/endpoints/roles/roles';
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
  },

  createUser: (
    {login, password, role}: ICreateUserPayload,
    callback = (err: Error | null) => {}) => async (dispatch: any) => {
    
    let user = null;
    
    try {
        
      const userCreated = await AuthAPI.createUser(login, password);
      user = userCreated.user
        
      await RolesAPI.addRoleToUser(user.uid, role);
      
      //dispatch();
      callback(null)
    } catch (error) {
      callback(error as Error)
    }
  }
}

export default AuthService;