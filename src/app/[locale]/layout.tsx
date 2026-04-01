import Navigation from '@/components/Navigation';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getDictionary } from '@/i18n/dictionaries';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body>
        <Navigation locale={locale} dict={dict.Navigation} />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}