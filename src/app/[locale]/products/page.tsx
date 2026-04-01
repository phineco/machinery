import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ProductCard';

const products = [
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
  },
  {
    id: '4',
    title: 'Caterpillar 336D Excavator',
    brand: 'Caterpillar',
    year: 2019,
    hours: 2900,
    price: '$95,000',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Caterpillar%20336D%20excavator%2C%20large%20construction%20equipment%2C%20professional%20photography&image_size=landscape_4_3'
  },
  {
    id: '5',
    title: 'Volvo EC210B Excavator',
    brand: 'Volvo',
    year: 2018,
    hours: 3200,
    price: '$82,000',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Volvo%20EC210B%20excavator%2C%20professional%20construction%20machinery%2C%20yellow%20color&image_size=landscape_4_3'
  },
  {
    id: '6',
    title: 'Doosan DX225LC Excavator',
    brand: 'Doosan',
    year: 2020,
    hours: 1800,
    price: '$88,000',
    imageUrl: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Doosan%20DX225LC%20excavator%2C%20modern%20construction%20equipment%2C%20professional%20photography&image_size=landscape_4_3'
  }
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="w-full border p-2 rounded">
                  <option>All Categories</option>
                  <option>Excavators</option>
                  <option>Loaders</option>
                  <option>Cranes</option>
                  <option>Bulldozers</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <select className="w-full border p-2 rounded">
                  <option>All Brands</option>
                  <option>Caterpillar</option>
                  <option>Komatsu</option>
                  <option>Hitachi</option>
                  <option>Volvo</option>
                  <option>Doosan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="From" className="w-full border p-2 rounded" />
                  <input type="number" placeholder="To" className="w-full border p-2 rounded" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Hours</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="w-full border p-2 rounded" />
                  <input type="number" placeholder="Max" className="w-full border p-2 rounded" />
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Construction Equipment</h1>
            <p className="text-gray-600">Showing {products.length} machines</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}