'use client';

import Link from 'next/link';
import {useState} from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Machinery Portal
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <div className="flex space-x-2">
              <Link href="/en" className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                EN
              </Link>
              <Link href="/es" className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                ES
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Products
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <div className="flex space-x-2 px-3 py-2">
              <Link href="/en" className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                EN
              </Link>
              <Link href="/es" className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                ES
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}