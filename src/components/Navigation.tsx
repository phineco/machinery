'use client';

import Link from 'next/link';
import { useRef } from 'react';

export default function Navigation({
  locale,
  dict,
}: {
  locale: string;
  dict: { home: string; products: string; about: string; contact: string; title: string };
}) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const closeMenu = () => {
    if (checkboxRef.current) checkboxRef.current.checked = false;
  };

  return (
    <>
      <style>{`
        #nav-toggle { display: none; }
        #mobile-menu { display: none; }
        #nav-toggle:checked ~ div #mobile-menu { display: block; }
        .icon-close { display: none; }
        #nav-toggle:checked ~ div .icon-open  { display: none; }
        #nav-toggle:checked ~ div .icon-close { display: block; }
      `}</style>

      <nav className="bg-white shadow-lg relative z-[100]">
        <input id="nav-toggle" type="checkbox" ref={checkboxRef} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          <div className="flex justify-between h-16">

            {/* Logo */}
            <div className="flex items-center">
              <Link href={`/${locale}`} className="text-xl font-bold text-gray-800" onClick={closeMenu}>
                {dict.title || 'Machinery Portal'}
              </Link>
            </div>

            {/* 桌面端菜单 */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href={`/${locale}/products`} className="text-gray-700 hover:text-blue-600">
                {dict.products || 'Products'}
              </Link>
              <Link href={`/${locale}/contact`} className="text-gray-700 hover:text-blue-600">
                {dict.contact || 'Contact'}
              </Link>
              <div className="flex space-x-2">
                {[['en', 'EN'], ['es', 'ES'], ['zh', '中文']].map(([lang, label]) => (
                  <Link
                    key={lang}
                    href={`/${lang}`}
                    className={`px-3 py-1 text-sm rounded ${locale === lang ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* 汉堡按钮：label 触发 checkbox */}
            <div className="md:hidden flex items-center">
              <label
                htmlFor="nav-toggle"
                className="text-gray-700 hover:text-blue-600 p-2 cursor-pointer"
                aria-label="Toggle menu"
              >
                <svg className="icon-open h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className="icon-close h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </label>
            </div>

          </div>

          {/* 移动端下拉菜单 */}
          <div id="mobile-menu" className="md:hidden border-t border-gray-200">
            <div className="pt-2 pb-4 space-y-1">
              <Link
                href={`/${locale}/products`}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={closeMenu}
              >
                {dict.products || 'Products'}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                onClick={closeMenu}
              >
                {dict.contact || 'Contact'}
              </Link>
              <div className="border-t border-gray-200 pt-4 pb-2">
                <div className="flex space-x-2 px-3">
                  {[['en', 'EN'], ['es', 'ES'], ['zh', '中文']].map(([lang, label]) => (
                    <Link
                      key={lang}
                      href={`/${lang}`}
                      className={`px-4 py-2 text-sm rounded-md flex-1 text-center font-medium ${locale === lang ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                      onClick={closeMenu}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </nav>
    </>
  );
}
