import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}