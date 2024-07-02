import { firebaseAuth } from '@src/config/firebaseService';
import { signInWithEmailAndPassword } from 'firebase/auth';

const signin = async (login: string, password: string) => {
  const response = await signInWithEmailAndPassword(firebaseAuth,login, password);

  return response;
}

const AuthAPI = {
  signin,
}

export default AuthAPI;