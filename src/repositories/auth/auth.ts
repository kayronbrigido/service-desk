import { firebaseAuth } from "@src/config/firebaseService";
import { signInWithEmailAndPassword } from "firebase/auth";

export const sign = async (login: string, password: string) => {
  const response = await signInWithEmailAndPassword(firebaseAuth,login, password);

  return response;
}