'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ApiProduct } from '@/services/api';
import { getBrandName } from '@/utils/category';

export default function ProductCard({ product, dict, locale = 'en' }: { product: ApiProduct, dict: any, locale?: string }) {
  // 解析品牌名称
  const brandName = getBrandName(product.brand);

  // WhatsApp 预设消息格式，从环境变量读取，如果未设置则使用默认值
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+8618949813729";
  // 拼接标题，如果有品牌和型号则拼接，否则用ID
  const productTitle = `${brandName} ${product.model || ''}`.trim() || `Product ${product.id}`;
  // React Hydration 会在客户端使用 encodeURIComponent 后的值与服务端对比可能出现问题，
  // 为了避免 hydration error，我们将链接的生成放到渲染中或者确保一致。
  // 注意：encodeURIComponent 会导致 `%` 字符，在服务端和客户端生成是完全一致的。
  // 但是如果在 href 里使用它可能需要注意属性对比。更可能出问题的是 locale / pathname
  // 我们使用固定的 pathname (如从 props 传入或者 context 中获取稳定的值)
  
  // 也可以通过 suppressHydrationWarning 解决客户端生成的日期等不一致
  // 不过我们这里确保纯函数逻辑一致即可。

  const waMessage = encodeURIComponent(`Hi, I'm interested in your ${productTitle} (ID: ${product.id}). Could you provide more details?`);
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  // 处理年份展示，如果是完整日期字符串，只取年份
  const displayYear = product.years ? product.years.substring(0, 4) : '';
  
  // 格式化价格，确保服务端和客户端渲染格式一致，不依赖本地时区/地区
  // 使用 'en-US' 强制一致性，避免 hydration error
  const displayPrice = product.price ? `$${Number(product.price).toLocaleString('en-US')}` : 'Price on request';

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col h-full">
      <Link href={`/${locale}/products/${product.id}`} className="block group">
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image 
            src={product.imgUrl || 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=excavator%20placeholder&image_size=landscape_4_3'} 
            alt={productTitle} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="p-4 pb-0">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">{productTitle}</h3>
        </div>
      </Link>
      <div className="p-4 pt-2 flex flex-col flex-1">
        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <p>📍 {dict?.brand || 'Brand'}: <span className="font-medium">{brandName || '-'}</span></p>
          <p>📅 {dict?.year || 'Year'}: {displayYear || '-'}</p>
          <p>⏱️ {dict?.hours || 'Hours'}: {product.hours ? `${product.hours} h` : '-'}</p>
        </div>
        <div className="mt-4 flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-orange-600" suppressHydrationWarning>{displayPrice}</span>
        </div>
        <div className="mt-4 flex gap-2">
          {/* WhatsApp 快捷沟通按钮 */}
          <a 
            href={waLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded font-medium flex items-center justify-center gap-2"
            suppressHydrationWarning
          >
            <span>💬 {dict?.whatsapp || 'WhatsApp'}</span>
          </a>
          {/* 在线留言按钮 - 跳转到联系页面并带上产品ID */}
          <Link 
            href={`/${locale}/contact?productId=${product.id}&productName=${encodeURIComponent(productTitle)}`}
            className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded font-medium text-center flex items-center justify-center"
            suppressHydrationWarning
          >
            {dict?.inquire || 'Inquire'}
          </Link>
        </div>
      </div>
    </div>
  );
}