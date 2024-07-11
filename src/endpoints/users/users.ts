import { addDoc, collection } from 'firebase/firestore';
import { ICreateUserPayload } from '@src/models/auth';
import { dataBase } from '@src/config/firebaseService'

const createUser = async (userAuthId: string, userData: ICreateUserPayload ) => {

  delete userData.password

  const response = await addDoc(collection(dataBase, 'user'), {
    userAuthId: userAuthId, userData
  })

  return response;
};

const UserAPI = {
  createUser,
}

export default UserAPI;
