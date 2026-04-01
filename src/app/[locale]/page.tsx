import ProductCard from '@/components/ProductCard';
import { getDictionary } from '@/i18n/dictionaries';

const mockProducts = [
  {
    id: '1',
    title: 'Caterpillar 320D Excavator',
    brand: 'Caterpillar',
    year: 2018,
    hours: 3500,
    price: '$85,000',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Professional%20Caterpillar%20320D%20excavator%20in%20construction%20site%2C%20yellow%20color%2C%20high%20quality%20photography&image_size=landscape_4_3'
  },
  {
    id: '2',
    title: 'Komatsu PC200-8 Excavator',
    brand: 'Komatsu',
    year: 2019,
    hours: 2800,
    price: '$78,000',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Komatsu%20PC200-8%20excavator%20%2C%20professional%20construction%20equipment%20photography%2C%20clean%20background&image_size=landscape_4_3'
  },
  {
    id: '3',
    title: 'Hitachi ZX200-3 Excavator',
    brand: 'Hitachi',
    year: 2017,
    hours: 4200,
    price: '$72,000',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Hitachi%20ZX200-3%20excavator%2C%20professional%20construction%20machinery%20photography%2C%20orange%20color&image_size=landscape_4_3'
  }
];

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white p-8 mb-12">
        <h1 className="text-4xl font-bold mb-4">{dict.HomePage.title}</h1>
        <p className="text-xl mb-6">{dict.HomePage.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder={dict.HomePage.searchPlaceholder}
            className="flex-1 px-4 py-2 rounded-lg text-gray-900"
          />
          <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-medium whitespace-nowrap">
            {dict.HomePage.browseProducts}
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{dict.HomePage.featuredProducts}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} dict={dict.ProductCard} />
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