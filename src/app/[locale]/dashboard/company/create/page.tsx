'use client'

import { Container, Input } from '@src/components';
import { ICreateCompanyPayload } from '@src/models/auth';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const CreateCompanyPage = () => {
  const [form, setForm] = useState<ICreateCompanyPayload>()

  const translate = useTranslations('PAGES.DASHBOARD.COMPANY.CREATE_COMPANY');
  const translateAddress = useTranslations('GENERAL.ADDRESS');

  return (
    <div className='w-full h-full m-16 flex flex-col content-center align-center items-center justify-items-center'>
      <Container className='w-full flex justify-center p-10'>
        <div className='mr-24'>
          <Input placeholder={translateAddress('STREET')} onChange={(e) => { }} value={''} />
          <Input placeholder={translateAddress('NUMBER')} onChange={(e) => { }} value={''} />
          <Input placeholder={translateAddress('NEIGHBORHOOD')} onChange={(e) => { }} value={''} />
          <Input placeholder={translateAddress('CITY')} onChange={(e) => { }} value={''} />
        </div>
        <div>
          <Input placeholder={translateAddress('STATE')} onChange={(e) => { }} value={''} />
          <Input placeholder={translateAddress('COUNTRY')} onChange={(e) => { }} value={''} />
          <Input placeholder={translateAddress('ZIP_CODE')} onChange={(e) => { }} value={''} />
          <Input placeholder={translateAddress('ADDITIONAL_INFORMATION')} onChange={(e) => { }} value={''} />
        </div>
      </Container>
      <Container className='w-full flex flex-col align-center content-center items-center p-10 my-12'>
        <div className='columns-2 mb-12'>
          <Input placeholder={translate('TAX_IDENTIFIER')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('NAME')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('FANTASY_NAME')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('ADMIN_NAME')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('ADMIN_NAME_LAST_NAME')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('PHONE')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('EMAIL')} onChange={(e) => { }} value={''} />
        </div>
        <div className='columns-2'>
          <Input placeholder={translate('LOGIN')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('PASSWORD')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('CONFIRM_PASSWORD')} onChange={(e) => { }} value={''} />
          <Input placeholder={translate('COMPANY_TYPE')} onChange={(e) => { }} value={''} />
        </div>

      </Container>
    </div>
  )
}

export default CreateCompanyPage;