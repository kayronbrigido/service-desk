import CompanyAPI from '@src/endpoints/companies/companies'
import { ISearchParamsCompany } from '@src/models/searchParams';
import { getCompanies } from '@src/store/slicers/companySlice';


const CompanyService = {
  getCompanies: (searchParams: ISearchParamsCompany) => async (dispatch: any) => {
    try {
      const payload = await CompanyAPI.getCompanies(searchParams);

      dispatch(getCompanies(payload));
    } catch (err) {
      console.log('error', err)
    }
  }
}

export default CompanyService;