import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import ReduxProvider from '@src/store/provider';
import { getMessages } from 'next-intl/server';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ServiceDesk',
  description: 'Developed By Kayron Brigido',
};


export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
