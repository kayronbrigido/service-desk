'use server'

import { createTranslator } from 'next-intl';
import { getLocale, getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
 
const locales = ['en', 'pt'];

const getTranslator = async (locale: string) => {
  if (!locales.includes(locale)) notFound();

  const messages = (await import(`../messages/${locale}.json`)).default;
  return createTranslator({ locale, messages });
};

export const translate = async (key: string) => {
  const t = await getTranslator(await getLocale());
  return t(key)
}
 
export default getRequestConfig(async ({locale}) => {

  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
