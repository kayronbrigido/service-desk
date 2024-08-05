'use client'

import { Button, Container, Input, Select } from '@src/components';
import { ButtonTypeEnum } from '@src/components/Button/Button';
import { ICreateCompanyPayload } from '@src/models/auth';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CompaniesType } from '@src/models/enums';
import { maskCEP, maskCNPJ, maskPhone } from '@src/utils/masks';
import AuthService from '@src/services/auth';
import { useAppDispatch } from '@src/hooks/useRedux';

const CreateCompanyPage = () => {
  const [form, setForm] = useState<ICreateCompanyPayload>()
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useAppDispatch()

  const translate = useTranslations('PAGES.DASHBOARD.COMPANY.CREATE_COMPANY');
  const translateAddress = useTranslations('GENERAL.ADDRESS');
  const translateEnum = useTranslations('ENUMS.COMPANIES_TYPES')

  const handleSubmit = () => {
    if (form) {
      dispatch(AuthService.createCompany(form))
    }
  }

  const handleCancel = () => {
    setForm({});
    setPasswordConfirmation('');
  }

  const companiesType = Object.
    values(CompaniesType)
    .filter(key => isNaN(Number(CompaniesType[key as number])))
    .map((role) => ({
      name: translateEnum(role.toString()),
      value: role
    }))

  return (
    <div className='w-full h-full my-16 flex flex-col items-center'>
      <div className="flex-start w-11/12 mb-6">
        <h1>{translate('TITLE')}</h1>
        <p>{translate('DESCRIPTION')}</p>
      </div>
      <Container className='w-11/12 flex flex-col items-center p-10'>
        <div className="mb-8 flex flex-col w-full items-center">
          <h1>{translate('ADDRESS_INFO')}</h1>
        </div>
        <div className='flex justify-center'>
          <div className='columns-2'>
            <Input placeholder={translateAddress('STREET')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, street: e.target.value } }) }}
              value={form?.address?.street ?? ''}
              data-testId='companyAddressStreet' />
            <Input placeholder={translateAddress('NUMBER')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, number: e.target.value } }) }}
              value={form?.address?.number ?? ''}
              data-testId='companyAddressNumber' />
            <Input placeholder={translateAddress('NEIGHBORHOOD')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, neighborhood: e.target.value } }) }}
              value={form?.address?.neighborhood ?? ''}
              data-testId='companyAddressNeighborhood' />
            <Input placeholder={translateAddress('CITY')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, city: e.target.value } }) }}
              value={form?.address?.city ?? ''}
              data-testId='companyAddressCity' />
            <Input placeholder={translateAddress('STATE')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, state: e.target.value } }) }}
              value={form?.address?.state ?? ''}
              data-testId='companyAddressState' />
            <Input placeholder={translateAddress('COUNTRY')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, country: e.target.value } }) }}
              value={form?.address?.country ?? ''}
              data-testId='companyAddressCountry' />
            <Input placeholder={translateAddress('ZIP_CODE')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, zipCode: e.target.value } }) }}
              value={maskCEP(form?.address?.zipCode ?? '')}
              data-testId='companyAddressZipCode' />
            <Input placeholder={translateAddress('ADDITIONAL_INFORMATION')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, additionalInformation: e.target.value } }) }}
              value={form?.address?.additionalInformation ?? ''}
              data-testId='companyAddressAdditionalInformation' />
          </div>
        </div>
      </Container>
      <Container className='w-11/12 flex flex-col items-center p-10 my-6'>
        <div className="mb-8 flex flex-col w-full items-center">
          <h1>{translate('COMPANY_INFO')}</h1>
        </div>
        <div className='columns-2'>
          <Input
            placeholder={translate('TAX_IDENTIFIER')}
            onChange={(e) => { setForm({ ...form, taxIdentifier: e.target.value }) }}
            value={maskCNPJ(form?.taxIdentifier ?? '')}
            data-testId='companyTaxIdentier' />
          <Input
            placeholder={translate('NAME')}
            onChange={(e) => { setForm({ ...form, name: e.target.value }) }} value={form?.name ?? ''}
            data-testId='companyName' />
          <Input
            placeholder={translate('FANTASY_NAME')}
            onChange={(e) => { setForm({ ...form, fantasyName: e.target.value }) }}
            value={form?.fantasyName ?? ''}
            data-testId='companyFantasyName' />
          <Input
            placeholder={translate('PHONE')}
            onChange={(e) => { setForm({ ...form, phone: e.target.value }) }}
            value={maskPhone(form?.phone ?? '')}
            data-testId='companyPhone' />
          <Input
            placeholder={translate('EMAIL')}
            onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
            value={form?.email ?? ''}
            data-testId='companyEmail' />
          <Input
            placeholder={translate('ADMIN_FIRST_NAME')}
            onChange={(e) => { setForm({ ...form, firstName: e.target.value }) }}
            value={form?.firstName ?? ''}
            data-testId='companyAdminFirstName' />
          <Input
            placeholder={translate('ADMIN_LAST_NAME')}
            onChange={(e) => { setForm({ ...form, lastName: e.target.value }) }}
            value={form?.lastName ?? ''}
            data-testId='companyAdminLastName' />
        </div>
      </Container>
      <Container className='w-11/12 flex flex-col items-center p-10'>
        <div className="mb-8 flex flex-col w-full items-center">
          <h1>{translate('ADMIN_LOGIN')}</h1>
        </div>
        <div className='columns-2'>
          <Input
            placeholder={translate('LOGIN')}
            onChange={(e) => { setForm({ ...form, login: e.target.value }) }}
            value={form?.login ?? ''}
            data-testId='companyLogin'
          />
          <Input
            placeholder={translate('PASSWORD')}
            onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
            value={form?.password ?? ''}
            data-testId='companyPassword'
          />
          <Input
            placeholder={translate('CONFIRM_PASSWORD')}
            onChange={(e) => { setPasswordConfirmation(e.target.value) }}
            value={passwordConfirmation ?? ''}
            data-testId='companyConfirmPassword'
          />
          <Select
            title={translate('COMPANY_TYPE')}
            items={companiesType}
            onChange={(type) => { setForm({ ...form, type: type as number }) }}
            testId='companyType'
          />
        </div>
      </Container>
      <div className="flex justify-evenly w-full my-12">
        <Button type={'button'} onClick={handleSubmit} value={translate('BUTTON_CONFIRM')} />
        <Button type={'button'} onClick={handleCancel} value={translate('BUTTON_CANCEL')} buttonStyle={ButtonTypeEnum.OUTLINED} />
      </div>
    </div>
  )
}

export default CreateCompanyPage;