'use client'

import { Button, Input } from '@src/components';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { firebaseAuth } from '@src/config/firebaseService';
import { sign } from '@src/repositories/auth/auth';

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

  const handleLogin = async () => {
    try {
      await sign(form.login, form.password);
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
    </main>);
}

export default LoginPage;