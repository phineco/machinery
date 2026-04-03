import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { getDictionary } from '@/i18n/dictionaries';
import { fetchProducts, ApiProduct } from '@/services/api';

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const {locale} = await params;
  const dict = await getDictionary(locale);
  const pDict = dict.ProductsPage || {};
  
  // 解析查询参数
  const resolvedSearchParams = await searchParams;
  const current = Number(resolvedSearchParams.page) || 1;
  const size = Number(resolvedSearchParams.size) || 12;
  const brand = typeof resolvedSearchParams.brand === 'string' ? resolvedSearchParams.brand : undefined;
  const type = typeof resolvedSearchParams.type === 'string' ? resolvedSearchParams.type : undefined;
  
  // 获取产品列表
  let products: ApiProduct[] = [];
  let totalCount = 0;
  
  try {
    const res = await fetchProducts({ current, size, brand, type });
    products = res.records || [];
    totalCount = res.total || 0;
  } catch (error) {
    console.error('Failed to load products:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilters pDict={pDict} />
        </div>
        
        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pDict.title || 'Construction Equipment'}</h1>
            <p className="text-gray-600">{(pDict.showing || 'Showing {count} machines').replace('{count}', totalCount.toString())}</p>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} dict={dict.ProductCard} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}