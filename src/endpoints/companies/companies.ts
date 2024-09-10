import { addDoc, collection, getDocs,  limit,  orderBy, query, startAfter } from 'firebase/firestore';
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

  const pageLimit = searchParams?.limit ?? 20;
  const pageOffset = searchParams?.offset ?? 0;
  
  const countQueryRef = collection(dataBase, 'company');
  const totalCountSnapshot = await getDocs(countQueryRef);
  const totalDocuments = totalCountSnapshot.size;

  const queryRef = query(
    collection(dataBase, 'company'),
    orderBy(searchParams?.orderBy ?? 'name', searchParams?.sortBy ?? 'asc'),
    limit(3),
    startAfter(pageOffset),
  );

  const querySnapshot = await getDocs(queryRef);
  const response = querySnapshot.docs.map((company) => ({id: company.id, ...company.data()}));

  const totalPages = String(totalDocuments / pageLimit).split('.')[0];
  const currentPage = Math.floor(Number(pageOffset) / pageLimit) + 1;

  return {
    data: response,
    totalPages: Number(totalPages),
    currentPage: currentPage
  };
}

const CompanyAPI = {
  createCompany,
  getCompanies
}

export default CompanyAPI;
