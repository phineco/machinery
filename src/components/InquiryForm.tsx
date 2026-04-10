'use client';
import { useState } from 'react';
import { submitInquiry, InquiryData } from '@/services/api';

export default function InquiryForm({ productId, dict }: { productId?: string, dict?: any }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    
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
      const response = await submitInquiry({
        ...data,
        productId,
      } as InquiryData);
      
      // 我们在 services/api.ts 里对非 2xx 的响应抛出了异常，
      // 所以如果执行到这里，说明服务端验证通过并且保存成功了。
      setStatus('success');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus('idle');
      // 如果 error 带有服务端返回的具体信息，提取出来显示给用户
      const errorMsg = error.message || dict?.error || 'Failed to send inquiry. Please try again.';
      setErrorMessage(errorMsg);
    }
  };

  if (status === 'success') {
    return <div className="p-4 bg-green-50 text-green-700 rounded">{dict?.success || 'Thank you for your inquiry! We will contact you soon.'}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="font-bold text-lg border-b pb-2">{dict?.title || 'Send Inquiry'}</h3>
      
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">{dict?.name || 'Name *'}</label>
        <input name="name" required maxLength={64} className="w-full border p-2 rounded" placeholder="Your Name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{dict?.email || 'Email'}</label>
        <input type="email" name="email" maxLength={64} className="w-full border p-2 rounded" placeholder="Your Email Address" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{dict?.phoneNumber || 'Phone Number'}</label>
        <input type="tel" name="phoneNumber" maxLength={20} className="w-full border p-2 rounded" placeholder="Your Phone/WhatsApp Number" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">{dict?.message || 'Message'}</label>
        <textarea name="message" rows={4} maxLength={1024} className="w-full border p-2 rounded" placeholder="What are you looking for?"></textarea>
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