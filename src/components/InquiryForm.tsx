'use client';
import { useState } from 'react';
import { submitInquiry, InquiryData } from '@/services/api';

export default function InquiryForm({ productId, dict }: { productId?: string, dict?: any }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // 验证：邮箱和电话不能同时为空
    if (!data.email && !data.phoneNumber) {
      alert(dict?.contactRequired || 'Please provide either an Email or a Phone Number so we can contact you.');
      return;
    }

    setStatus('submitting');

    try {
      // 调用后端 API 保存留言
      await submitInquiry({
        ...data,
        productId,
      } as InquiryData);

      setStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('idle');
      alert(dict?.error || 'Failed to send inquiry. Please try again.');
    }
  };

  if (status === 'success') {
    return <div className="p-4 bg-green-50 text-green-700 rounded">{dict?.success || 'Thank you for your inquiry! We will contact you soon.'}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="font-bold text-lg border-b pb-2">{dict?.title || 'Send Inquiry'}</h3>
      <div>
        <label className="block text-sm font-medium mb-1">{dict?.name || 'Name *'}</label>
        <input name="name" required className="w-full border p-2 rounded" placeholder="Your Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{dict?.email || 'Email'}</label>
        <input type="email" name="email" className="w-full border p-2 rounded" placeholder="Your Email Address" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{dict?.phoneNumber || 'Phone Number'}</label>
        <input type="tel" name="phoneNumber" className="w-full border p-2 rounded" placeholder="Your Phone/WhatsApp Number" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{dict?.message || 'Message'}</label>
        <textarea name="message" rows={4} className="w-full border p-2 rounded" placeholder="What are you looking for?"></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'submitting' ? (dict?.submitting || 'Submitting...') : (dict?.submit || 'Send Inquiry')}
      </button>
    </form>
  );
}