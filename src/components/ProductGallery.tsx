'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border bg-gray-50">
        <Image 
          src={mainImage} 
          alt={alt} 
          fill 
          className="object-contain"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.map((img, index) => (
            <div 
              key={index}
              onClick={() => setMainImage(img)}
              className={`relative h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                mainImage === img ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-blue-300'
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