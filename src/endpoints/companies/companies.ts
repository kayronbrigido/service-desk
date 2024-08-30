import { addDoc, collection, getDocs,  limit,  orderBy, query, startAt } from 'firebase/firestore';
import { ICreateCompanyPayload } from '@src/models/auth';
import { ISearchParamsCompany } from '@src/models/searchParams';
import { dataBase } from '@src/config/firebaseService'

const createCompany = async (userAuthId: string, userData: ICreateCompanyPayload ) => {

  delete userData.password

  const response = await addDoc(collection(dataBase, 'company'), {
    userAuthId: userAuthId, 
    ...userData
  })

  return response;
};

const getCompanies = async (searchParams?: ISearchParamsCompany) => {

  const queryRef = query(
    collection(dataBase, 'company'),
    orderBy(searchParams?.orderBy || 'name', searchParams?.sortBy || 'asc'),
    startAt(searchParams?.offset ?? '0'),
    limit(searchParams?.limit ?? 20)
  );

  const querySnapshot = await getDocs(queryRef)

  const response = querySnapshot.docs.map((company) => ({id: company.id, ...company.data()}));
  return response;
}

const CompanyAPI = {
  createCompany,
  getCompanies
}

export default CompanyAPI;
