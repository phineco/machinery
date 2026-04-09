'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const mainImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // 最小滑动距离 (px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // 重置 touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasMultipleImages) {
      handleNext();
    }
    if (isRightSwipe && hasMultipleImages) {
      handlePrevious();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div 
        className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border bg-gray-50 group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image 
          src={mainImage} 
          alt={alt} 
          fill 
          className="object-contain"
          priority
        />
        
        {/* 桌面端左右切换箭头 (仅在有超过1张图片且hover时显示) */}
        {hasMultipleImages && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultipleImages && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.map((img, index) => (
            <div 
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                currentIndex === index ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-blue-300'
              }`}
            >
              <Image 
                src={img} 
                alt={`${alt} thumbnail ${index + 1}`} 
                fill 
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}