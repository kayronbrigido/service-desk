import UserAPI from "@src/endpoints/users/users"
import { IUserData } from "@src/models/auth"
import { startLoading, stopLoading } from "@src/store/slicers/loadingSlice"
import { setLoggedUser } from "@src/store/slicers/userSlice"

const UserService = {
  getLoggedUser: (userAuthId: string) => async (dispatch: any) => {
    dispatch(startLoading())
    try{
      const payload = await UserAPI.getUserByAuthId(userAuthId)

      dispatch(setLoggedUser(payload))

    } finally {
      dispatch(stopLoading())
    }
  },

  updateUser: (userId: string, userData: IUserData) => async (dispatch: any) => {
    dispatch(startLoading())
    try{

      const payload = await UserAPI.updateUser(userId, userData);

      return payload
    } catch (e) {

    } finally {
      dispatch(stopLoading())
    }
  }
}

export default UserService;