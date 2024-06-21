'use client'

import { Input } from '@src/components';
import { useState } from 'react';

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

  return (
    <main>
      <h1>Login</h1>
      <Input value={form?.login} 
        placeholder='login' 
        name='login' 
        onChange={(e) => setForm({...form, login: e.target.value})}/>
      <Input value={form?.password} 
        placeholder='password' 
        name='password'
        onChange={(e) => setForm({...form, password: e.target.value})}
      />
    </main>);
}

export default LoginPage;