import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionaries';
import ProductGallery from '@/components/ProductGallery';
import InquiryForm from '@/components/InquiryForm';
import { notFound } from 'next/navigation';

// Mock data fetcher
const getProduct = (id: string) => {
  const products = [
    {
      id: '1',
      title: 'Caterpillar 320C Tracked Excavator',
      brand: 'Caterpillar',
      model: '320C CAT 320BL 320D2 320E 330DL',
      type: 'tracked excavator',
      year: 2019,
      hours: '3,700 m/h',
      weight: '9,979 kg',
      price: '$85,000',
      location: 'Shanghai, China',
      images: [
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20Caterpillar%20320D%20excavator%20in%20construction%20site%2C%20yellow%20color%2C%20high%20quality%20photography&image_size=landscape_4_3',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Caterpillar%20excavator%20cabin%20interior%2C%20controls%20view&image_size=landscape_4_3',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Caterpillar%20excavator%20engine%20compartment%2C%20clean&image_size=landscape_4_3',
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Caterpillar%20excavator%20tracks%20and%20undercarriage&image_size=landscape_4_3'
      ],
      description: 'Excellent condition Caterpillar tracked excavator. Ready for work. The engine and hydraulic pump are in perfect condition. No oil leak. Tracks are 80% new. We offer free repainting and maintenance service before shipping.'
    },
    {
      id: '2',
      title: 'Komatsu PC200-8 Excavator',
      brand: 'Komatsu',
      model: 'PC200-8',
      type: 'tracked excavator',
      year: 2019,
      hours: '2,800 m/h',
      weight: '19,500 kg',
      price: '$78,000',
      location: 'Shanghai, China',
      images: [
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Komatsu%20PC200-8%20excavator%20%2C%20professional%20construction%20equipment%20photography%2C%20clean%20background&image_size=landscape_4_3'
      ],
      description: 'Well-maintained Komatsu PC200-8. Original paint, powerful engine.'
    },
    {
      id: '3',
      title: 'Hitachi ZX200-3 Excavator',
      brand: 'Hitachi',
      model: 'ZX200-3',
      type: 'tracked excavator',
      year: 2017,
      hours: '4,200 m/h',
      weight: '20,000 kg',
      price: '$72,000',
      location: 'Shanghai, China',
      images: [
        'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Hitachi%20ZX200-3%20excavator%2C%20professional%20construction%20machinery%20photography%2C%20orange%20color&image_size=landscape_4_3'
      ],
      description: 'Reliable Hitachi excavator. Good working condition.'
    }
  ];

  return products.find(p => p.id === id) || products[0]; // fallback to first for demo
};

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);
  const pdDict = dict.ProductDetails || {};
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const waNumber = "8618949813729";
  const waMessage = encodeURIComponent(`Hi, I'm interested in your ${product.title} (ID: ${product.id}). Could you provide more details?`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-500">
        <Link href={`/${locale}`} className="hover:text-blue-600">{dict.Navigation?.home || 'Home'}</Link>
        <span className="mx-2">/</span>
        <Link href={`/${locale}/products`} className="hover:text-blue-600">{dict.Navigation?.products || 'Products'}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <ProductGallery images={product.images} alt={product.title} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">{pdDict.description || 'Description'}</h2>
            <div className="prose max-w-none text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Action */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="text-3xl font-bold text-orange-600 mb-6">{product.price}</div>

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
                <span className="font-medium text-gray-900">{product.brand}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.model || 'Model'}</span>
                <span className="font-medium text-gray-900 text-right max-w-[60%]">{product.model}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.type || 'Type'}</span>
                <span className="font-medium text-gray-900">{product.type}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.year || 'Year'}</span>
                <span className="font-medium text-gray-900">{product.year}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.hours || 'Hours'}</span>
                <span className="font-medium text-gray-900">{product.hours}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">{pdDict.weight || 'Weight'}</span>
                <span className="font-medium text-gray-900">{product.weight}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">{pdDict.location || 'Location'}</span>
                <span className="font-medium text-gray-900">{product.location}</span>
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