'use client'

import { Button, Container, HeaderTitle, Input, Select } from '@src/components';
import AuthService from '@src/services/auth';
import { ICreateUserPayload } from '@src/models/auth';
import { ErrosCode, RolesEnum } from '@src/models/enums';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Error from 'next/error';
import Toasty from '@src/utils/toast';

const initialValues: ICreateUserPayload = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  role: undefined
}


const CreatUserPage = () => {
  const [form, setForm] = useState<ICreateUserPayload>(initialValues)
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useAppDispatch();
  const { loggedUser} = useAppSelector((state) => state.user)

  useEffect(() => { 
    setForm({...form, companyId: loggedUser?.companyId ?? ''})
  }, [])
  const handleCreateUser = () => {
    if(loggedUser?.role != RolesEnum.ADMIN) {
      Toasty.error(ErrosCode.WITHOUT_PERMISSION);
    }

    dispatch(AuthService.createUser(form, (err) => {
      if(!err) {
        setForm(initialValues)
        setPasswordConfirmation('')
      }
    }))
  }

  const translateEnum = useTranslations('ENUMS.ROLES');
  const translate = useTranslations('PAGES.DASHBOARD.USERS.CREATE_USER');
  const roles = [
    {
      name: translateEnum(RolesEnum.ADMIN.toString()),
      value: RolesEnum.ADMIN
    },
    {
      name: translateEnum(RolesEnum.SUPPORT.toString()),
      value: RolesEnum.SUPPORT
    },
    {
      name: translateEnum(RolesEnum.OPPERATOR.toString()),
      value: RolesEnum.OPPERATOR
    },
  ]

  return (
    <div className='w-full h-full my-16 flex flex-col content-center align-center items-center justify-items-center'>
      <HeaderTitle title={translate('TITLE')} description={translate('DESCRIPTION')} />
      <Container className='w-11/12 flex flex-col items-center p-10'>
        <div className='flex justify-evenly align-center w-full my-8'>
          <div>
            <Input value={form?.login ?? ''}
              onChange={(e) => setForm({ ...form, login: e.target.value })}
              name={translate('LOGIN')}
              placeholder={translate('LOGIN')}
            />
            <Input value={form?.password ?? ''}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              name={translate('PASSWORD')}
              placeholder={translate('PASSWORD')}
            />
            <Input value={passwordConfirmation ?? ''}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              name={translate('CONFIRM_PASSWORD')}
              placeholder={translate('CONFIRM_PASSWORD')}
            />
          </div>
          <div>
            <Input value={form?.firstName ?? ''}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              name={translate('FIRST_NAME')}
              placeholder={translate('FIRST_NAME')}
            />
            <Input value={form?.lastName ?? ''}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
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