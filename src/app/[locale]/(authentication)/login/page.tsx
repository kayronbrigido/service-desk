'use client'

import { Button, Input } from '@src/components';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import AuthService from '@src/services/auth';
import { SessionStorageKey } from '@src/models/enums';
import { useAppDispatch } from '@src/hooks/useRedux';
import { useRouter } from 'next/navigation';
import validateToken from '@src/utils/validateToken';


interface ILoginForm {
	login: string,
	password: string,
}

const initalLoginForm: ILoginForm = { 
  login: '',
  password: ''
}
export default function LoginPage() {

  const [form, setForm] = useState<ILoginForm>(initalLoginForm);
  const translate = useTranslations('PAGES.LOGIN');
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    dispatch(AuthService.signin(form.login, form.password, (err) => {
      if(!err) {
        router.replace(`/${locale}/dashboard`);
      }
    }))
  };

  useEffect(() => {

    const token = sessionStorage.getItem(SessionStorageKey.ACCESS_TOKEN) as string;
    if (token && validateToken(token)) {
      router.replace(`/${locale}/dashboard`);
    }
  }, [locale, router]);

  return (
    <main className='flex flex-col justify-center justify-items-center items-center w100 h-screen'>
      <h1>Login</h1>
      <Input 
        test-id='loginInput'
        value={form?.login} 
        placeholder={translate('LOGIN')} 
        name={translate('LOGIN')} 
        onChange={(e) => setForm({...form, login: e.target.value})}/>
      <Input 
        test-id='passwordInput'
        value={form?.password} 
        secret
        placeholder={translate('PASSWORD')} 
        name={translate('PASSWORD')} 
        onChange={(e) => setForm({...form, password: e.target.value})}
      />
      <Button 
        test-id='loginButton'
        type='button' 
        value={translate('LOGIN_BUTTON')} 
        style={{textTransform: 'capitalize'}} 
        onClick={handleLogin}
      />
    </main>);
}