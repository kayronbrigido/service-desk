import { addDoc, collection } from 'firebase/firestore';
import { dataBase } from '@src/config/firebaseService'

const addRoleToUser = async (userId: string, role: number) => {
  await addDoc(collection(dataBase, 'user'), {userAuthId: userId, role: role})
};

const RolesAPI = {
  addRoleToUser
};

export default RolesAPI;