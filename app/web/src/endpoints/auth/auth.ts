import { User, createUserWithEmailAndPassword,deleteUser, signInWithEmailAndPassword  } from 'firebase/auth';

import { firebaseAuth } from '@src/config/firebaseService';

const signin = async (login: string, password: string) => {
  const response = await signInWithEmailAndPassword(firebaseAuth,login, password);

  return response;
}

const createUser = async (login: string, password: string) => {
  const response = await createUserWithEmailAndPassword(firebaseAuth, login, password)

  return response
}

const deleteAuthUser = async (user: User) => {
  const response = await deleteUser(user)

  return response;
}

const AuthAPI = {
  signin,
  createUser,
  deleteAuthUser
}

export default AuthAPI;