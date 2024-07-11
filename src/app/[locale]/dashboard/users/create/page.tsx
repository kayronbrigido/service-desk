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

  const translateEnum = useTranslations('ENUMS.ROLES');
  const translate = useTranslations('PAGES.DASHBOARD.USERS.CREATE_USER');
  const roles = Object
    .values(RolesEnum)
    .filter(key => isNaN(Number(RolesEnum[key])))
    .map((role) => ({
      name: translateEnum(role),
      value: role
    }))

  return (
    <div className='w-full h-full m-16 flex flex-col content-center align-center items-center justify-items-center'>
      <Container className='flex flex-col w-full p-10 content-center align-center items-center'>
        <h1>{translate('TITLE')}</h1>
        <h2>{translate('DESCRIPTION')}</h2>
        <div className='flex justify-evenly align-center w-full my-8'>
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
              items={roles}
              onChange={(role) => setForm({ ...form, role: Number(role) as unknown as RolesEnum })} />
          </div>
        </div>
        <Button
          type={'button'}
          onClick={handleCreateUser}
          value={translate('CREATE')}
        />
      </Container>

    </div>
  )
}

export default CreatUserPage;