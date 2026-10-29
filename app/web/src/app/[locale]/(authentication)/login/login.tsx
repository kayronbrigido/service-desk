'use client'

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { SessionStorageKey } from '@src/models/enums';
import { useRouter } from 'next/navigation';
import validateToken from '@src/utils/validateToken';
import { Button, Input, TouchableOpacity, Text } from '@src/components';
import { useLogin } from './useLogin';
import { Routes } from '@src/config/routes';

export const LoginTestIds = {
  loginInput: 'loginInput',
  passwordInput: 'passwordInput',
  loginButton: 'loginButton'
} as const

export function Login() {
  const { translate, navigationService, onLogin, form, setForm } = useLogin();
  
  return (
    <main className='flex flex-col justify-center justify-items-center items-center w100 h-screen'>
      <h1>Login</h1>
      <Input 
        test-id={LoginTestIds.loginButton}
        value={form?.login} 
        placeholder={translate('pages.login.login')} 
        name={translate('pages.login.login')} 
        onChange={(e) => setForm({...form, login: e.target.value})}/>
      <Input 
        test-id={LoginTestIds}
        value={form?.password} 
        secret
        placeholder={translate('pages.login.password')} 
        name={translate('pages.login.login.password')} 
        onChange={(e) => setForm({...form, password: e.target.value})}
      />
      <TouchableOpacity onClick={() => navigationService.navigateTo(Routes.Signup)}>
        <Text>{translate('pages.login.registration')}</Text>
      </TouchableOpacity>
      <Button 
        test-id={LoginTestIds.loginButton}
        type='button' 
        value={translate('general.login')} 
        style={{textTransform: 'capitalize'}} 
        onClick={onLogin}
      />
    </main>);
}