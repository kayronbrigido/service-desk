'use client'

import { Button, Container, Input } from '@src/components';
import { ButtonTypeEnum } from '@src/components/Button/Button';
import { ICreateCompanyPayload } from '@src/models/auth';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const CreateCompanyPage = () => {
  const [form, setForm] = useState<ICreateCompanyPayload>()

  const translate = useTranslations('PAGES.DASHBOARD.COMPANY.CREATE_COMPANY');
  const translateAddress = useTranslations('GENERAL.ADDRESS');

  const handleSubmit = () => {

  }

  const handleCancel = () => {
    setForm({});
  }

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
            <Input placeholder={translateAddress('STREET')} onChange={(e) => { }} value={''} />
            <Input placeholder={translateAddress('NUMBER')} onChange={(e) => { }} value={''} />
            <Input placeholder={translateAddress('NEIGHBORHOOD')} onChange={(e) => { }} value={''} />
            <Input placeholder={translateAddress('CITY')} onChange={(e) => { }} value={''} />
            <Input placeholder={translateAddress('STATE')} onChange={(e) => { }} value={''} />
            <Input placeholder={translateAddress('COUNTRY')} onChange={(e) => { }} value={''} />
            <Input placeholder={translateAddress('ZIP_CODE')} onChange={(e) => { }} value={''} />
            <Input placeholder={translateAddress('ADDITIONAL_INFORMATION')} onChange={(e) => { }} value={''} />
          </div>
        </div>
      </Container>
      <Container className='w-11/12 flex flex-col items-center p-10 my-6'>
        <div className="mb-8 flex flex-col w-full items-center">
          <h1>{translate('COMPANY_INFO')}</h1>
        </div>
        <div className='columns-2'>
          <Input placeholder={translate('TAX_IDENTIFIER')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('NAME')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('FANTASY_NAME')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('PHONE')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('EMAIL')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('ADMIN_NAME')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('ADMIN_NAME_LAST_NAME')} onChange={(e) => { }} value={''} />
        </div>
      </Container>
      <Container className='w-11/12 flex flex-col items-center p-10'>
        <div className="mb-8 flex flex-col w-full items-center">
          <h1>{translate('ADMIN_LOGIN')}</h1>
        </div>
        <div className='columns-2'>
          <Input placeholder={translate('LOGIN')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('PASSWORD')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('CONFIRM_PASSWORD')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('COMPANY_TYPE')} onChange={(e) => { }} value={''} />
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