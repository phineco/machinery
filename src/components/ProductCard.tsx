'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  brand: string;
  year: number;
  hours: number;
  price: string;
  imageUrl: string;
}

export default function ProductCard({ product, dict }: { product: Product, dict: any }) {
  const pathname = usePathname() || '/en';
  const locale = pathname.split('/')[1] || 'en';
  
  // WhatsApp 预设消息格式
  const waNumber = "8613800000000"; // 替换为您的 WhatsApp 商业号
  const waMessage = encodeURIComponent(`Hi, I'm interested in your ${product.title} (ID: ${product.id}). Could you provide more details?`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white">
      <div className="relative h-48 w-full">
        <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{product.title}</h3>
        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <p>📍 {dict?.brand || 'Brand'}: <span className="font-medium">{product.brand}</span></p>
          <p>📅 {dict?.year || 'Year'}: {product.year}</p>
          <p>⏱️ {dict?.hours || 'Hours'}: {product.hours} h</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">{product.price}</span>
        </div>
        <div className="mt-4 flex gap-2">
          {/* WhatsApp 快捷沟通按钮 */}
          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded font-medium flex items-center justify-center gap-2"
          >
            <span>💬 {dict?.whatsapp || 'WhatsApp'}</span>
          </a>
          {/* 在线留言按钮 - 跳转到联系页面并带上产品ID */}
          <Link 
            href={`/${locale}/contact?productId=${product.id}&productName=${encodeURIComponent(product.title)}`}
            className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded font-medium text-center flex items-center justify-center"
          >
            {dict?.inquire || 'Inquire'}
          </Link>
        </div>
      </div>
    </div>
  );
}