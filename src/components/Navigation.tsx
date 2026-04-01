import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/config';

export default function Navigation() {
  const t = useTranslations('Navigation');

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Machinery Export
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              {t('home')}
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900">
              {t('products')}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              {t('about')}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}