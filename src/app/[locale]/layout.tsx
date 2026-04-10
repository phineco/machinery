import Navigation from '@/components/Navigation';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getDictionary } from '@/i18n/dictionaries';
import Script from 'next/script';

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
      <head>
        <Script id="baidu-analytics" strategy="afterInteractive">
          {`
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?a4df11e3f011a97fabbbd3b76d9c373e";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          `}
        </Script>
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        <Navigation locale={locale} dict={dict.Navigation} />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}