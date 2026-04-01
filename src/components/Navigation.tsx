'use client';

import Link from 'next/link';
import {useState} from 'react';

export default function Navigation({ 
  locale, 
  dict 
}: { 
  locale: string; 
  dict: { home: string; products: string; about: string; contact: string; title: string; } 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg relative z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[100] bg-white">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="text-xl font-bold text-gray-800" onClick={() => setIsMenuOpen(false)}>
              {dict.title || 'Machinery Portal'}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${locale}/products`} className="text-gray-700 hover:text-blue-600">
              {dict.products || 'Products'}
            </Link>
            <Link href={`/${locale}/contact`} className="text-gray-700 hover:text-blue-600">
              {dict.contact || 'Contact'}
            </Link>
            <div className="flex space-x-2">
              <Link href="/en" className={`px-3 py-1 text-sm rounded ${locale === 'en' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                EN
              </Link>
              <Link href="/es" className={`px-3 py-1 text-sm rounded ${locale === 'es' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                ES
              </Link>
              <Link href="/zh" className={`px-3 py-1 text-sm rounded ${locale === 'zh' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                中文
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center z-50">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              className="text-gray-700 hover:text-blue-600 p-2 relative z-50 focus:outline-none"
              aria-expanded={isMenuOpen}
              type="button"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单下拉面板 - 确保它在最上层并且背景不透明 */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-xl border-t z-[90]">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              href={`/${locale}/products`} 
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              onClick={(e) => {
                setIsMenuOpen(false);
              }}
              onTouchEnd={(e) => {
                // Let the Link handle navigation, just close the menu
                setIsMenuOpen(false);
              }}
            >
              {dict.products || 'Products'}
            </Link>
            <Link 
              href={`/${locale}/contact`} 
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              onClick={(e) => {
                setIsMenuOpen(false);
              }}
              onTouchEnd={(e) => {
                setIsMenuOpen(false);
              }}
            >
              {dict.contact || 'Contact'}
            </Link>
            <div className="border-t border-gray-200 pt-4 pb-2">
              <div className="flex space-x-2 px-3">
                <Link 
                  href="/en" 
                  className={`px-4 py-2 text-sm rounded-md flex-1 text-center font-medium ${locale === 'en' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                  onTouchEnd={() => setIsMenuOpen(false)}
                >
                  EN
                </Link>
                <Link 
                  href="/es" 
                  className={`px-4 py-2 text-sm rounded-md flex-1 text-center font-medium ${locale === 'es' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                  onTouchEnd={() => setIsMenuOpen(false)}
                >
                  ES
                </Link>
                <Link 
                  href="/zh" 
                  className={`px-4 py-2 text-sm rounded-md flex-1 text-center font-medium ${locale === 'zh' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                  onTouchEnd={() => setIsMenuOpen(false)}
                >
                  中文
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}