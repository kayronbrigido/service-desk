'use client'

import { SessionStorageKey } from '@src/models/enums';
import { SidebarMenu } from '@src/components';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import validateToken from '@src/utils/validateToken';
import { useAppSelector } from '@src/hooks/useRedux';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { loggedUser } = useAppSelector((state) => state.user);
  const locale = useLocale();

  useEffect(() => {

    const token = sessionStorage.getItem(SessionStorageKey.ACCESS_TOKEN) as string;
    if (!validateToken(token)) {
      redirect(`/${locale}/`);
    }
  }, [locale, loggedUser]);

  return (
    <div className='flex'>
      <SidebarMenu />
      <div className='ml-64 w-4/5'>
        {children}
      </div>
    </div>)
}
