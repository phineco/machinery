import InquiryForm from '@/components/InquiryForm';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium w-20">WhatsApp:</span>
                  <a href="https://wa.me/8613800000000" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                    +86 138 0000 0000
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-20">Email:</span>
                  <span>info@machinery-export.com</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-20">Address:</span>
                  <span>Shanghai, China</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-bold text-lg mb-4">Business Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}