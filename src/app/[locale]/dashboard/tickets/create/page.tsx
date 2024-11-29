'use client'
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BaseModal, Button, Container, HeaderTitle, Input, TextArea } from "@src/components";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRedux";
import { ICompanyData } from "@src/models/company";
import { CompaniesType } from "@src/models/enums";
import { ISearchParamsCompany } from "@src/models/searchParams";
import { ETicketStatus, ITicket } from "@src/models/ticket";
import CompanyService from "@src/services/company";
import TicketService from "@src/services/tickets";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

const initialValues: ITicket = {
  title: '',
  description: '',
  requesterCompanyId: '',
  resolverCompanyId: '',
  openedByUser: '',
  status: ETicketStatus.OPENED
}

const initalQuery: ISearchParamsCompany = {
  limit: 5,
  type: [CompaniesType.SUPPORT, CompaniesType.BOTH],
  orderBy: 'name',
  offset: '0',
}

const NewTicketsPage = () => {
  const [form, setForm] = useState<ITicket>(initialValues);
  const [companyName, setCompanyName] = useState('');
  const { user: { loggedUser }, company: { companies } } = useAppSelector((state) => state);
  const [searchQuery, setSearchQuery] = useState<ISearchParamsCompany>(initalQuery);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedPage, setCachedPage] = useState<ICompanyData[][]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setForm({
      ...form,
      requesterCompanyId: loggedUser?.companyId || '',
      openedByUser: loggedUser?.companyId || ''
    })
  }, [loggedUser])

  const translate = useTranslations('PAGES.DASHBOARD.TICKETS.CREATE_TICKET');
  const companyTranslate = useTranslations('GENERAL.COMPANY');

  const handleCreateTicket = () => {
    dispatch(TicketService.createTicket(form))
  }

  console.log(loggedUser);
  
  useEffect(() => {
    dispatch(CompanyService.getCompanies(searchQuery))
  }, [])

  const handleSelectCompany = (companyData: ICompanyData) => {
    if (companyData.id) {
      setCompanyName(companyData?.name ?? '');
      setForm({ ...form, resolverCompanyId: companyData.id });
      setIsVisible(false);
    }
  }

  const companiesData = useMemo(() => {

    if (cachedPage[currentPage - 1]?.length > 0) {
      return cachedPage[currentPage - 1];
    }

    if (companies?.data) {
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

  const renderCompanies = () => (
    <div className="min-w-96 w-5/6">
      {companiesData?.map(company => (
        <div className="flex flex-col my-5" onClick={() => handleSelectCompany(company)}>
          <h1>{company.name}</h1>
          <span>{company.address?.street}, {company.address?.number}, {company.address?.neighborhood} {company.address?.city}-{company.address?.state}, {company.address?.country} {company.address?.zipCode}</span>
          <span>{companyTranslate("PHONE")}: {company.phone}</span>
          <span>{companyTranslate("TAX_IDENTIFIER")}: {company.taxIdentifier}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className='w-full h-full my-16 flex flex-col content-center align-center items-center justify-items-center'>
      <HeaderTitle title={translate('TITLE')} description={translate('DESCRIPTION')} />
      <Container className='w-11/12 flex flex-col items-center p-10'>
        <Input value={companyName}
          onChange={() => {}}
          name={translate('TICKET_COMPANY_NAME')}
          placeholder={translate('TICKET_COMPANY_NAME')}
          divClassName='w-9/12'
          inputClassName="w-full"
          onClick={() => { setIsVisible(true); console.log(isVisible) }}
        />
        <Input value={form?.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          name={translate('TICKET_TITLE')}
          placeholder={translate('TICKET_TITLE')}
          divClassName='w-9/12'
          inputClassName="w-full"
        />
        <TextArea value={form?.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          name={translate('TICKET_DESCRIPTION')}
          placeholder={translate('TICKET_DESCRIPTION')}
          className='w-9/12 min-h-56'
        />
        <Button
          type={'button'}
          onClick={handleCreateTicket}
          value={translate('CREATE')}
        />
      </Container>
      <BaseModal isVisible={isVisible}
        onCancel={() => setIsVisible(false)}
        onClose={() => setIsVisible(false)}
      >
        {renderCompanies()}
        <div className='flex w-full justify-end p-2'>
          <button onClick={handleBackPage} className='p-2'><LeftOutlined size={500} /></button>
          <span className='p-2' >{currentPage} / {companies?.totalPages}</span>
          <button onClick={handleNextPage} className='p-2'><RightOutlined /></button>
        </div>
      </BaseModal>
    </div>
  )
}

export default NewTicketsPage;