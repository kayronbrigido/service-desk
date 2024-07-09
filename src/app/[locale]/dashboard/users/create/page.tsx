'use client'

import { Button, Container, Input, Select } from '@src/components';
import AuthService from '@src/services/auth';
import { ICreateUserPayload } from '@src/models/auth';
import { RolesEnum } from '@src/models/enums';
import { useAppDispatch } from '@src/hooks/useRedux';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const initialValues: ICreateUserPayload = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  role: undefined
}

const CreatUserPage = () => {
  const [form, setForm] = useState<ICreateUserPayload>(initialValues)
  const dispatch = useAppDispatch();

  const handleCreateUser = () => {
    dispatch(AuthService.createUser(form))
  }

  const translate = useTranslations('PAGES.DASHBOARD.USERS.CREATE_USER');

  return (
    <div className='w-full flex flex-col content-center align-center items-center justify-items-center'>
      <Container className='w-full p-10'>
        <h1>{translate('TITLE')}</h1>
        <h2>{translate('DESCRIPTION')}</h2>
        <div className='flex justify-evenly align-center w-full'>
          <div>
            <Input value={form?.login}
              onChange={(e) => setForm({ ...form, login: e.target.value })}
              name={translate('LOGIN')}
              placeholder={translate('LOGIN')}
            />
            <Input value={form?.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              name={translate('PASSWORD')}
              placeholder={translate('PASSWORD')}
            />
            <Input value={form?.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              name={translate('CONFIRM_PASSWORD')}
              placeholder={translate('CONFIRM_PASSWORD')}
            />
          </div>
          <div>
            <Input value={form?.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              name={translate('FIRST_NAME')}
              placeholder={translate('FIRST_NAME')}
            />
            <Input value={form?.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              name={translate('LAST_NAME')}
              placeholder={translate('LAST_NAME')}
            />
            <Select
              title={translate('ROLE')}
              items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
              onChange={(role) => setForm({ ...form, role: Number(role) })} />
          </div>
        </div>
      </Container>
      <Button
        type={'button'}
        onClick={handleCreateUser}
        value={translate('CREATE')}
        className='my-10'
      />
      {Object.keys(RolesEnum).map((key) => (<p>{key}</p>))}
    </div>
  )
}

export default CreatUserPage;