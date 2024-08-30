'use client'

import { Container, DataTable } from '@src/components';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { useEffect, useState } from 'react';
import CompanyService from '@src/services/company';
import { ISearchParamsCompany } from '@src/models/searchParams';
import { useTranslations } from 'next-intl';

const initalQuery: ISearchParamsCompany = {
  limit: 10,
  orderBy: 'name',
  offset: '0',
}



const ListCompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState<ISearchParamsCompany>(initalQuery);
  const dispatch = useAppDispatch();
  const { companies } = useAppSelector((state) => state.company);
  const translateCompanyData = useTranslations('GENERAL.COMPANY');
  const translate = useTranslations('PAGES.DASHBOARD.COMPANY.LIST_COMPANY');

  const collumns = [
    {
      field: 'name',
      name: translateCompanyData('NAME'),
    },
    {
      field: 'fantasyName',
      name: translateCompanyData('FANTASY_NAME'),
    },
    {
      field: 'taxIdentifier',
      name: translateCompanyData('TAX_IDENTIFIER'),
    },
  ]


  useEffect(() => {
    dispatch(CompanyService.getCompanies(searchQuery))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full h-full my-16 flex flex-col items-center'>
      <div className="flex-start w-11/12 mb-6">
        <h1>{translate('TITLE')}</h1>
      </div>
      <Container className='w-11/12 flex flex-col items-center p-10'>
        <DataTable collumns={collumns} rows={companies ?? []} />
      </Container>
    </div>
  )
}

export default ListCompaniesPage;