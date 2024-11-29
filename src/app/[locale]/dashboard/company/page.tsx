'use client'

import { Container, DataTable, HeaderTitle } from '@src/components';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { useEffect, useState, useMemo } from 'react';
import CompanyService from '@src/services/company';
import { ISearchParamsCompany } from '@src/models/searchParams';
import { useTranslations } from 'next-intl';
import { ICompanyData } from '@src/models/company';

const initalQuery: ISearchParamsCompany = {
  limit: 30,
  orderBy: 'name',
  offset: '0',
}

const ListCompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState<ISearchParamsCompany>(initalQuery);
  const dispatch = useAppDispatch();
  const { company: { companies }, loading: { loading } } = useAppSelector((state) => state);
  const translateCompanyData = useTranslations('GENERAL.COMPANY');
  const translate = useTranslations('PAGES.DASHBOARD.COMPANY.LIST_COMPANY');
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedPage, setCachedPage] = useState<ICompanyData[][]>([]);

  const collumns = [
    {
      field: 'name',
      name: translateCompanyData('NAME'),
    },
    {
      field: 'tradeName',
      name: translateCompanyData('FANTASY_NAME'),
    },
    {
      field: 'taxIdentifier',
      name: translateCompanyData('TAX_IDENTIFIER'),
    },
  ]

  const rows = useMemo(() => {
    
    if (cachedPage[currentPage - 1]?.length > 0) {
      return cachedPage[currentPage - 1]; 
    }

    if(companies?.data) {
      return companies.data
    }

    return []; 
  }, [cachedPage, companies, currentPage]);

  const handleNextPage = () => {

    if (currentPage - 1 < cachedPage.length) {
      setCurrentPage(currentPage + 1);
      return
    }

    if (companies?.totalPages && currentPage < companies?.totalPages && companies?.data) {
      const lastCompany = companies?.data?.at(-1)
      cachedPage[currentPage - 1] = companies?.data;
      setCachedPage(cachedPage);
      setSearchQuery({ ...searchQuery, offset: lastCompany?.name })
      dispatch(CompanyService.getCompanies({ ...searchQuery, offset: lastCompany?.name }))
      setCurrentPage(currentPage + 1);
    }
  }

  const handleBackPage = () => {
    if (currentPage - 1 > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    dispatch(CompanyService.getCompanies(searchQuery))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full my-16 flex flex-col items-center'>
      <HeaderTitle title={translate('TITLE')} description={translate('DESCRIPTION')} />
      <Container className='w-11/12 flex flex-col items-center p-10'>
        <DataTable
          collumns={collumns}
          rows={rows}
          onNext={handleNextPage}
          onBack={handleBackPage}
          page={currentPage ?? undefined}
          pageCount={companies?.totalPages ?? undefined} />
      </Container>
    </div>
  )
}

export default ListCompaniesPage;