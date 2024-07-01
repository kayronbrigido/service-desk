'use client'

import { Button, Input } from '@src/components';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import AuthService from '@src/services/auth';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ILoginForm {
	login: string,
	password: string,
}

const initalLoginForm: ILoginForm = { 
  login: '',
  password: ''
}
const LoginPage = () => {

  const [form, setForm] = useState<ILoginForm>(initalLoginForm);
  const translate = useTranslations('PAGES.LOGIN');

  const dispatch = useAppDispatch();
  const { authenticated } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      dispatch(AuthService.signin())
    } catch (error) { }
  };

  return (
    <main className='flex flex-col justify-center justify-items-center items-center w100 h-screen'>
      <h1>Login</h1>
      <Input 
        data-testId='loginInput'
        value={form?.login} 
        placeholder={translate('LOGIN')} 
        name={translate('LOGIN')} 
        onChange={(e) => setForm({...form, login: e.target.value})}/>
      <Input 
        data-testId='passwordInput'
        value={form?.password} 
        secret
        placeholder={translate('PASSWORD')} 
        name={translate('PASSWORD')} 
        onChange={(e) => setForm({...form, password: e.target.value})}
      />
      <Button 
        data-testId='loginButton'
        type='button' 
        value={translate('LOGIN_BUTTON')} 
        style={{textTransform: 'capitalize'}} 
        onClick={handleLogin}
      />
      <h1>{authenticated ? 'sim' : 'não'}</h1>
    </main>);
}

export default LoginPage;