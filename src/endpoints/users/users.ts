import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { ICreateUserPayload, IUserData } from '@src/models/auth';
import { dataBase } from '@src/config/firebaseService'
import { update } from 'firebase/database';

const createUser = async (userAuthId: string, userData: ICreateUserPayload) => {

  delete userData.password

  const response = await addDoc(collection(dataBase, 'user'), {
    userAuthId: userAuthId, ...userData
  })

  return response;
};

const getUserByAuthId = async (userAuthId: string): Promise<IUserData> => {
  const snapshot = await getDocs(
    query(
      collection(dataBase, 'user'),
      where('userAuthId', '==', userAuthId)
    )
  )

  return snapshot.docs.map((user) => ({
    id: user.id,
    firstName: user.data().firstName,
    lastName: user.data().lastName,
    login: user.data().login,
    ...user.data()
  }))[0]

}

const updateUser = async (userId: string, userData: IUserData) => {
  const snapshot = await updateDoc(doc(dataBase, 'users', userId), {...userData})

  return snapshot;
}

const UserAPI = {
  createUser,
  getUserByAuthId,
  updateUser
}

export default UserAPI;
