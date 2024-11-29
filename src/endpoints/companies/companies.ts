import { addDoc, collection, endAt, getDocs,  limit,  orderBy, query, startAfter, startAt, where } from 'firebase/firestore';
import { ICreateCompanyPayload } from '@src/models/auth';
import { ISearchParamsCompany } from '@src/models/searchParams';
import { dataBase } from '@src/config/firebaseService'
import { Collections } from '@src/models/enums';


const THIS_COLLECTION = Collections.COMPANY;

const createCompany = async (userAuthId: string, userData: ICreateCompanyPayload ) => {

  delete userData.password

  const response = await addDoc(collection(dataBase, THIS_COLLECTION), {
    userAuthId: userAuthId, 
    ...userData
  })

  return response;
};

const getCompanies = async (searchParams?: ISearchParamsCompany) => {

  try{
  const pageLimit = searchParams?.limit ?? 20;
  const pageOffset = searchParams?.offset ?? 0;
  
  const countQueryRef = collection(dataBase, THIS_COLLECTION);
  const totalCountSnapshot = await getDocs(countQueryRef);
  const totalDocuments = totalCountSnapshot.size;

  let queryRef = query(
    collection(dataBase, THIS_COLLECTION),
    orderBy(searchParams?.orderBy ?? 'name', searchParams?.sortBy ?? 'asc'),
    limit(pageLimit),
    startAfter(pageOffset),
  );

  console.log(searchParams)
  

  if (searchParams?.type) {
    queryRef = query(
      queryRef,
      where('type', typeof searchParams.type === 'object' ? 'in' : '==', searchParams.type)
    );
  }

  if (searchParams?.name) {
    queryRef = query(
      queryRef,
      where('name', '==', searchParams.name)
    );
  }

  const querySnapshot = await getDocs(queryRef);
  const response = querySnapshot.docs.map((company) => ({id: company.id, ...company.data()}));

  const totalPages = String(totalDocuments / pageLimit).split('.')[0];
  const currentPage = Math.floor(Number(pageOffset) / pageLimit) + 1;

  console.log('response' ,response)
  return {
    data: response,
    totalPages: Number(totalPages) > 0 ? Number(totalPages) : 1,
    currentPage: currentPage
  };
} catch(e) {
  console.log('erro',e)

  return {
    data: [],
    totalPages: 0,
    currentPage: 0
  };
}
}

const CompanyAPI = {
  createCompany,
  getCompanies
}

export default CompanyAPI;
