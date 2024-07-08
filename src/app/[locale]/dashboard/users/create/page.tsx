'use client'

import { Button, Input } from '@src/components';
import AuthService from '@src/services/auth';
import { ICreateUserPayload } from '@src/models/auth';
import { RolesEnum } from '@src/models/enums';
import { useAppDispatch } from '@src/hooks/useRedux';
import { useState } from 'react';

const initialValues: ICreateUserPayload = {
  login: '',
  password: '',
  role: RolesEnum.SuperAdmin
}

const CreatUserPage = () => {
  const [form, setForm] = useState<ICreateUserPayload>(initialValues)
  const dispatch = useAppDispatch();

  const handleCreateUser = () => {
    dispatch(AuthService.createUser(form))
  }

  return <div>
    <Input value={form?.login} onChange={(e) => setForm({...form, login: e.target.value })} name='lgoin' placeholder='login'/>
    <Input value={form?.password} onChange={(e) => setForm({...form, password: e.target.value })} name='senha' placeholder='senha'/>
    <Input onChange={(e) => setForm({...form, login: e.target.value })} />
    <Input />
    <Input />
    <Button type={'button'} onClick={handleCreateUser}/>
  </div>
}

export default CreatUserPage;