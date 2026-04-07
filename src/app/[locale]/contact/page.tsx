import InquiryForm from '@/components/InquiryForm';
import { getDictionary } from '@/i18n/dictionaries';

export default async function ContactPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const dict = await getDictionary(locale);
  const cDict = dict.ContactPage || {};

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+8618949813729";
  // 将类似 "+8618949813729" 格式化为 "+86 189 4981 3729" 用于显示，如果是其他格式则直接显示
  const displayWaNumber = waNumber.replace(/^(\+\d{2})(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3 $4') || waNumber;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{cDict.title || 'Contact Us'}</h1>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-4">{cDict.getInTouch || 'Get in Touch'}</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium w-24">{cDict.whatsapp || 'WhatsApp:'}</span>
                  <a href={`https://wa.me/${waNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                    {displayWaNumber}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">{cDict.email || 'Email:'}</span>
                  <span>info@machinery-export.com</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24">{cDict.address || 'Address:'}</span>
                  <span>{cDict.addressValue || 'Shanghai, China'}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-4">{cDict.businessHours || 'Business Hours'}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{cDict.monFri || 'Monday - Friday:'}</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{cDict.sat || 'Saturday:'}</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{cDict.sun || 'Sunday:'}</span>
                  <span>{cDict.closed || 'Closed'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <InquiryForm dict={dict.InquiryForm} />
        </div>
      </div>
    </div>
  );
}