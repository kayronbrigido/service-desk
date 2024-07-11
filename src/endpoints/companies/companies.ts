import { addDoc, collection } from 'firebase/firestore';
import { ICreateCompanyPayload } from '@src/models/auth';
import { dataBase } from '@src/config/firebaseService'

const createCompany = async (userAuthId: string, userData: ICreateCompanyPayload ) => {

  delete userData.password

  const response = await addDoc(collection(dataBase, 'company'), {
    userAuthId: userAuthId, userData
  })

  return response;
};

const CompanyAPI = {
  createCompany,
}

export default CompanyAPI;
