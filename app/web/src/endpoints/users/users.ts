import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { ICreateUserPayload, IUserData } from '@src/models/auth';
import { dataBase } from '@src/config/firebaseService'
import { Collections } from '@src/models/enums';

const THIS_COLLECTION = Collections.USER;

const addRoleToUser = async (userId: string, role: number) => {
  await addDoc(collection(dataBase, THIS_COLLECTION), {userAuthId: userId, role: role})
};

const createUser = async (userAuthId: string, userData: ICreateUserPayload) => {

  delete userData.password

  const response = await addDoc(collection(dataBase, THIS_COLLECTION), {
    userAuthId: userAuthId, ...userData
  })

  return response;
};

const getUserByAuthId = async (userAuthId: string): Promise<IUserData> => {
  const snapshot = await getDocs(
    query(
      collection(dataBase, THIS_COLLECTION),
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
  const snapshot = await updateDoc(doc(dataBase, THIS_COLLECTION, userId), {...userData})

  return snapshot;
}

const UserAPI = {
  createUser,
  getUserByAuthId,
  updateUser,
  addRoleToUser
}

export default UserAPI;
