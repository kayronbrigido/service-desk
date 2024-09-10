import UserAPI from "@src/endpoints/users/users"
import { startLoading, stopLoading } from "@src/store/slicers/loadingSlice"
import { setLoggedUser } from "@src/store/slicers/userSlice"

const UserService = {
  getLoggedUser: (userAuthId: string) => async (dispatch: any) => {
    dispatch(startLoading())
    try{
      console.log('asdasdas')
      const payload = await UserAPI.getUserByAuthId(userAuthId)

      console.log(payload)
      dispatch(setLoggedUser(payload))

    } finally {
      dispatch(stopLoading())
    }
  }
}

export default UserService;