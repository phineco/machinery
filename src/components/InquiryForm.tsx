'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function InquiryForm({ productId }: { productId?: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const t = useTranslations('InquiryForm');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // 调用后端 API 保存留言
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, productId }),
    });

    if (response.ok) {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return <div className="p-4 bg-green-50 text-green-700 rounded">{t('success')}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="font-bold text-lg border-b pb-2">{t('title')}</h3>
      <div>
        <label className="block text-sm font-medium mb-1">{t('name')}</label>
        <input name="name" required className="w-full border p-2 rounded" placeholder="Your Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t('contact')}</label>
        <input name="contact" required className="w-full border p-2 rounded" placeholder="Email or Phone Number" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{t('message')}</label>
        <textarea name="message" rows={4} className="w-full border p-2 rounded" placeholder="What are you looking for?"></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}