'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function ProductFilters({ pDict }: { pDict: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 初始化 state，保证和 URL 参数同步
  const [type, setType] = useState(searchParams.get('type') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');

  const handleApplyFilters = () => {
    // 构建新的 Query String
    const params = new URLSearchParams(searchParams.toString());
    
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }

    if (brand) {
      params.set('brand', brand);
    } else {
      params.delete('brand');
    }

    // 筛选条件变化时，默认重置回第一页
    params.set('page', '1');

    // 发起路由跳转
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="font-bold text-lg mb-4">{pDict.filters || 'Filters'}</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">{pDict.category || 'Category'}</label>
          <select 
            className="w-full border p-2 rounded" 
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">{pDict.allCategories || 'All Categories'}</option>
            <option value="1">{pDict.excavators || 'Excavators'}</option>
            <option value="2">{pDict.loaders || 'Loaders'}</option>
            <option value="3">{pDict.cranes || 'Cranes'}</option>
            <option value="4">{pDict.bulldozers || 'Bulldozers'}</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <select 
            className="w-full border p-2 rounded"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">{pDict.allBrands || 'All Brands'}</option>
            <option value="1">Caterpillar</option>
            <option value="2">Komatsu</option>
            <option value="3">Hitachi</option>
            <option value="4">Volvo</option>
            <option value="5">Doosan</option>
          </select>
        </div>
        
        {/* 年份和小时数过滤后续可继续接入，此处暂保留结构 */}
        <div>
          <label className="block text-sm font-medium mb-2">Year</label>
          <div className="flex gap-2">
            <input type="number" placeholder={pDict.from || 'From'} className="w-full border p-2 rounded" />
            <input type="number" placeholder={pDict.to || 'To'} className="w-full border p-2 rounded" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Hours</label>
          <div className="flex gap-2">
            <input type="number" placeholder={pDict.min || 'Min'} className="w-full border p-2 rounded" />
            <input type="number" placeholder={pDict.max || 'Max'} className="w-full border p-2 rounded" />
          </div>
        </div>
        
        <button 
          onClick={handleApplyFilters}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {pDict.applyFilters || 'Apply Filters'}
        </button>
      </div>
    </div>
  );
}