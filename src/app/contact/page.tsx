import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Propgent',
  description: 'Get in touch with our expert real estate agents today.',
};

export default function ContactPage() {
  return (
    <div className="bg-muted min-h-screen pb-24">
      {/* Header Section */}
      <div className="bg-primary text-primary-foreground pt-12 pb-24">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold mb-4 text-white">Contact Us</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base">We're here to help you find your perfect property. Reach out to us today and our team will get back to you shortly.</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container -mt-12 relative z-10">
        <ContactForm />
      </div>
      
      {/* Contact Info Cards */}
      <div className="container mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={24} />
            </div>
            <h3 className="font-heading font-bold text-lg mb-1 text-primary">Call Us</h3>
            <p className="text-gray-500 text-sm mb-3">We're available Mon-Fri, 9am-6pm</p>
            <a href="tel:+919876543210" className="text-accent font-bold text-base hover:underline">+91 98765 43210</a>
          </div>
          
          <div className="bg-white p-6 rounded-xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={24} />
            </div>
            <h3 className="font-heading font-bold text-lg mb-1 text-primary">Email Us</h3>
            <p className="text-gray-500 text-sm mb-3">Send us a message anytime</p>
            <a href="mailto:hello@propgent.com" className="text-accent font-bold text-base hover:underline">hello@propgent.com</a>
          </div>
          
          <div className="bg-white p-6 rounded-xl text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-heading font-bold text-lg mb-1 text-primary">Visit Us</h3>
            <p className="text-gray-500 text-sm mb-3">Drop by our main office</p>
            <p className="text-accent font-bold text-base">123 Business Park, Mumbai</p>
          </div>
        </div>
      </div>
    </div>
  );
}
