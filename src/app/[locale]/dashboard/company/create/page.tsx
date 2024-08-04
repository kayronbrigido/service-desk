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
    if(form) {
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
              value={form?.address?.street ?? ''} />
            <Input placeholder={translateAddress('NUMBER')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, number: e.target.value } }) }}
              value={form?.address?.number ?? ''} />
            <Input placeholder={translateAddress('NEIGHBORHOOD')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, neighborhood: e.target.value } }) }}
              value={form?.address?.neighborhood ?? ''} />
            <Input placeholder={translateAddress('CITY')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, city: e.target.value } }) }}
              value={form?.address?.city ?? ''} />
            <Input placeholder={translateAddress('STATE')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, state: e.target.value } }) }}
              value={form?.address?.state ?? ''} />
            <Input placeholder={translateAddress('COUNTRY')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, country: e.target.value } }) }}
              value={form?.address?.country ?? ''} />
            <Input placeholder={translateAddress('ZIP_CODE')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, zipCode: e.target.value } }) }}
              value={maskCEP(form?.address?.zipCode ?? '')} />
            <Input placeholder={translateAddress('ADDITIONAL_INFORMATION')}
              onChange={(e) => { setForm({ ...form, address: { ...form?.address, additionalInformation: e.target.value }}) }}
              value={form?.address?.additionalInformation ?? ''} />
          </div>
        </div>
      </Container>
      <Container className='w-11/12 flex flex-col items-center p-10 my-6'>
        <div className="mb-8 flex flex-col w-full items-center">
          <h1>{translate('COMPANY_INFO')}</h1>
        </div>
        <div className='columns-2'>
          <Input placeholder={translate('TAX_IDENTIFIER')} onChange={(e) => { setForm({...form, taxIdentifier: e.target.value }) }} value={maskCNPJ(form?.taxIdentifier ?? '')} />
          <Input placeholder={translate('NAME')} onChange={(e) => { setForm({...form, name: e.target.value }) }} value={form?.name ?? ''} />
          <Input placeholder={translate('FANTASY_NAME')} onChange={(e) => { setForm({...form, fantasyName: e.target.value }) }} value={form?.fantasyName ?? ''} />
          <Input placeholder={translate('PHONE')} onChange={(e) => { setForm({...form, phone: e.target.value}) }} value={maskPhone(form?.phone ?? '')} />
          <Input placeholder={translate('EMAIL')} onChange={(e) => { setForm({...form, email: e.target.value}) }} value={form?.email ?? ''} />
          <Input placeholder={translate('ADMIN_NAME')} onChange={(e) => { setForm({...form, firstName: e.target.value}) }} value={form?.firstName ?? ''} />
          <Input placeholder={translate('ADMIN_NAME_LAST_NAME')} onChange={(e) => { setForm({...form, lastName: e.target.value}) }} value={form?.lastName ?? ''} />
        </div>
      </Container>
      <Container className='w-11/12 flex flex-col items-center p-10'>
        <div className="mb-8 flex flex-col w-full items-center">
          <h1>{translate('ADMIN_LOGIN')}</h1>
        </div>
        <div className='columns-2'>
          <Input placeholder={translate('LOGIN')} onChange={(e) => { setForm({...form, login: e.target.value}) }} value={form?.login ?? ''} />
          <Input placeholder={translate('PASSWORD')} onChange={(e) => { setForm({...form, password: e.target.value}) }} value={form?.password ?? ''} />
          <Input placeholder={translate('CONFIRM_PASSWORD')} onChange={(e) => { setPasswordConfirmation(e.target.value) }} value={passwordConfirmation ?? ''} />
          <Select title={translate('COMPANY_TYPE')} items={companiesType} onChange={(type) => { setForm({...form, type: type as number})} } />
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