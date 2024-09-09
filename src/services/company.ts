import { startLoading, stopLoading } from '@src/store/slicers/loadingSlice';
import CompanyAPI from '@src/endpoints/companies/companies'
import { ISearchParamsCompany } from '@src/models/searchParams';
import { getCompanies } from '@src/store/slicers/companySlice';


const CompanyService = {
  getCompanies: (searchParams: ISearchParamsCompany) => async (dispatch: any) => {
    try {
      dispatch(startLoading())
      const payload = await CompanyAPI.getCompanies(searchParams);
      
      dispatch(getCompanies(payload));
    } catch (err) {

    } finally{
      dispatch(stopLoading())
    }
  }
}

export default CompanyService;