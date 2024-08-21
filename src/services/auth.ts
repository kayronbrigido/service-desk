import AuthAPI from '@src/endpoints/auth/auth';
import { ICreateCompanyPayload, ICreateUserPayload } from '@src/models/auth';
import RolesAPI from '@src/endpoints/roles/roles';
import { RolesEnum, SessionStorageKey } from '@src/models/enums';
import { setAuthenticated } from '@src/store/slicers/authSlice'
import UserAPI from '@src/endpoints/users/users';
import CompanyAPI from '@src/endpoints/companies/companies';
import Toasty from './toast';


const AuthService = {
  signin: (login: string, password: string, callback = (err: Error | null) => {}) => async (dispatch: any) => {
    try{
      const { user } = await AuthAPI.signin(login, password);
      const idToken = await user.getIdToken()

      sessionStorage.setItem(SessionStorageKey.ACCESS_TOKEN, idToken)

      dispatch(setAuthenticated(true));
      callback(null);
    } catch(e) {
      Toasty.error('INVALID_CREDENTIALS');
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
  },

  createCompany: (
    companyData: ICreateCompanyPayload,
    callback = (err: Error | null) => {}) => async (dispatch: any) => {
  
    let userAuth = null;
    
    try {
      
      const userCreated = await AuthAPI.createUser(companyData.login as string, companyData.password as string);
      userAuth = userCreated.user

      delete companyData.password

      const {login, firstName, lastName, ...companyPayload} = companyData;

      const userData: ICreateUserPayload = {
        login,      
        firstName,
        lastName,
        role: RolesEnum.ADMIN
      }

      const user = await UserAPI.createUser(userAuth.uid, userData)
      await CompanyAPI.createCompany(userAuth.uid, {...companyPayload, userId: user.id})

      //dispatch();
      Toasty.success('CREATE_COMPANY');
      callback(null)
    } catch (error) {
      if(error?.message?.includes('email-already-in-use')){
        Toasty.error('EMAIL_ALREADY_IN_USE');
      } else {
        Toasty.error('CREATE_COMPANY')
      }
      callback(error as Error)
    }
  }
}

export default AuthService;