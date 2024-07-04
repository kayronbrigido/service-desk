'use client'

import { SessionStorageKey } from '@src/models/enums';
import { SidebarMenu } from '@src/components';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import validateToken from '@src/utils/validateToken';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const locale = useLocale();
  
  useEffect(() => {

    const token = sessionStorage.getItem(SessionStorageKey.ACCESS_TOKEN) as string;
    if (!validateToken(token)) {
      redirect(`/${locale}/`);
    }
  }, [locale]);
  
  return (<div className='flex'>
    <SidebarMenu />
    {children}</div>)
}
