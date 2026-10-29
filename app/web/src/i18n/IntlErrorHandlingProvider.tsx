'use client';

import { IntlError, NextIntlClientProvider } from 'next-intl';

export default function IntlErrorHandlingProvider({ children, locale }: { children: React.ReactNode, locale: string }) {

    const getMessageFallback = (key: string) => {
        return 'generic_error';
    }

    const handleIntlError = (error: IntlError) => {
        return error
    }

    return (
        <NextIntlClientProvider locale={locale}
            onError={(error) => handleIntlError(error)}
            getMessageFallback={({ key }) => getMessageFallback(key)}
        >
            {children}
        </NextIntlClientProvider>
    );
}