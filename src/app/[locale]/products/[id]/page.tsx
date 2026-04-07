import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';
import ProductGallery from '@/components/ProductGallery';
import InquiryForm from '@/components/InquiryForm';
import { fetchProductById } from '@/services/api';
import { getCategoryName, getBrandName } from '@/utils/category';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);
  const pdDict = dict.ProductDetails || {};
  
  let product;
  try {
    product = await fetchProductById(id);
  } catch (error) {
    console.error('Failed to load product details:', error);
  }

  if (!product) {
    notFound();
  }

  // 解析品牌名称
  const brandName = getBrandName(product.brand);

  // 拼接标题
  const productTitle = `${brandName} ${product.model || ''}`.trim() || `Product ${product.id}`;
  
  // 处理图片数组
  const images = product.imgUrl ? product.imgUrl.split(',').filter(Boolean) : ['https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=excavator%20placeholder&image_size=landscape_4_3'];

  const waNumber = "8618949813729";
  const waMessage = encodeURIComponent(`Hi, I'm interested in your ${productTitle} (ID: ${product.id}). Could you provide more details?`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;
  
  // 处理展示用的年份
  const displayYear = product.years ? product.years.substring(0, 4) : '-';
  const displayPrice = product.price ? `$${Number(product.price).toLocaleString('en-US')}` : 'Price on request';

  // 尝试解析技术参数（如果是 JSON 格式）
  let techParamsData: Record<string, string> | null = null;
  if (product.techParams) {
    try {
      techParamsData = JSON.parse(product.techParams);
    } catch (e) {
      // 解析失败说明可能是纯文本，不做处理
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-500">
        <Link href={`/${locale}`} className="hover:text-blue-600">{dict.Navigation?.home || 'Home'}</Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/products`} className="hover:text-blue-600">{dict.Navigation?.products || 'Products'}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{productTitle}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <ProductGallery images={images} alt={productTitle} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">{pdDict.description || 'Description'}</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
              {product.techParams && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-xl mb-4 text-gray-900">Technical Parameters</h3>
                  {techParamsData && typeof techParamsData === 'object' && !Array.isArray(techParamsData) ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {Object.entries(techParamsData).map(([key, value], index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 w-1/3 border-r border-gray-200">
                                {key}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {String(value)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">{product.techParams}</pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Info & Action */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{productTitle}</h1>
            <div className="text-3xl font-bold text-orange-600 mb-6">{displayPrice}</div>

            <div className="space-y-3 mb-6">
              <a 
                href={waLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                {dict.ProductCard?.whatsapp || 'WhatsApp'}
              </a>
              <a 
                href="#inquiry-form"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-center py-3 rounded-lg font-medium block transition-colors"
              >
                {pdDict.sendInquiry || 'Send Inquiry'}
              </a>
            </div>

            <h3 className="font-bold text-lg mb-4 border-b pb-2">{pdDict.basicInfo || 'Basic Information'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.brand || 'Brand'}</span>
                <span className="font-medium text-gray-900">{brandName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.model || 'Model'}</span>
                <span className="font-medium text-gray-900 text-right max-w-[60%]">{product.model}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.type || 'Type'}</span>
                <span className="font-medium text-gray-900">{getCategoryName(product.type, dict.ProductsPage)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.year || 'Year'}</span>
                <span className="font-medium text-gray-900">{displayYear}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.hours || 'Hours'}</span>
                <span className="font-medium text-gray-900">{product.hours}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.weight || 'Weight'}</span>
                <span className="font-medium text-gray-900">{product.netWeight} kg</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">{pdDict.location || 'Location'}</span>
                <span className="font-medium text-gray-900">{product.saleInfo || 'Shanghai, China'}</span>
              </div>
            </div>
          </div>

          <div id="inquiry-form" className="scroll-mt-24">
            <InquiryForm productId={product.id} dict={dict.InquiryForm} />
          </div>
        </div>
      </div>
    </div>
  );
}