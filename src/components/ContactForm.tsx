'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      mobile: formData.get('mobile'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to submit form');
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="contact" className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-primary mb-2">Contact Us Today</h2>
        <p className="text-gray-500 text-sm">Have a question or need assistance? Fill out the form below and our team will get back to you shortly.</p>
      </div>

      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded-xl mb-6 text-center text-sm font-medium border border-green-200">
          Thank you for reaching out! We'll contact you soon.
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-xl mb-6 text-center text-sm font-medium border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input required type="text" name="name" className="w-full text-sm rounded-xl border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
            <input required type="tel" name="mobile" className="w-full text-sm rounded-xl border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="9876543210" pattern="[6-9][0-9]{9}" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" name="email" className="w-full text-sm rounded-xl border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="john@example.com" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
          <textarea name="message" rows={4} className="w-full text-sm rounded-xl border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="How can we help you?"></textarea>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-semibold py-3 text-sm rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2">
          {loading ? 'Sending...' : (
            <>
              Send Message <Send size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
