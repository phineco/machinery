import ProductCard from '@/components/ProductCard';
import { getDictionary } from '@/i18n/dictionaries';
import { fetchProducts, ApiProduct } from '@/services/api';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const dict = await getDictionary(locale);
  
  // 获取推荐产品或前几个产品作为首页展示
  let featuredProducts: ApiProduct[] = [];
  try {
    const res = await fetchProducts({ size: 3, isRecommend: '1' });
    featuredProducts = res.records || [];
    
    // 如果没有推荐产品，则获取最新的三个
    if (featuredProducts.length === 0) {
      const fallbackRes = await fetchProducts({ size: 3 });
      featuredProducts = fallbackRes.records || [];
    }
  } catch (error) {
    console.error('Failed to load featured products:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white p-8 mb-12">
        <h1 className="text-4xl font-bold mb-4">{dict.HomePage.title}</h1>
        <p className="text-xl mb-6">{dict.HomePage.subtitle}</p>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{dict.HomePage.featuredProducts}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} dict={dict.ProductCard} locale={locale} />
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{dict.HomePage.aboutUs}</h2>
        <p className="text-gray-600 mb-4">
          {dict.HomePage.aboutDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <div className="text-gray-600">{dict.HomePage.machinesSold}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">50+</div>
            <div className="text-gray-600">{dict.HomePage.countriesServed}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">10+</div>
            <div className="text-gray-600">{dict.HomePage.yearsExperience}</div>
          </div>
        </div>
      </div>
    </div>
  );
}