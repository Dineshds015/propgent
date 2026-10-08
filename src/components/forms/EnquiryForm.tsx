"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  message: z.string().max(1000).optional(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

interface EnquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export default function EnquiryForm({ propertyId, propertyTitle }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      message: 'I am interested in this property. Please contact me.',
    },
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, propertyId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit enquiry');
      }

      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-surface rounded-2xl p-8 border border-border shadow-md text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">Enquiry Submitted!</h3>
        <p className="text-muted-foreground">
          Thank you for your interest in {propertyTitle}. Our team will contact you shortly.
        </p>
        <button 
          onClick={() => setSubmitStatus('idle')}
          className="mt-6 text-sm font-semibold text-accent underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-md sticky top-28">
      <h3 className="text-xl font-bold text-primary mb-2">Interested in this property?</h3>
      <p className="text-muted-foreground text-sm mb-6">Fill out the form below and our agent will get in touch with you.</p>

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-600">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">Full Name *</label>
          <input
            {...register('name')}
            type="text"
            className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary placeholder:text-muted-foreground/60 transition-all"
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">Mobile Number *</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">+91</span>
            <input
              {...register('mobile')}
              type="tel"
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary placeholder:text-muted-foreground/60 transition-all"
              placeholder="9876543210"
            />
          </div>
          {errors.mobile && <p className="mt-1.5 text-xs text-red-500">{errors.mobile.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">Email Address (Optional)</label>
          <input
            {...register('email')}
            type="email"
            className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary placeholder:text-muted-foreground/60 transition-all"
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">Message</label>
          <textarea
            {...register('message')}
            rows={4}
            className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary placeholder:text-muted-foreground/60 transition-all resize-none"
            placeholder="I am interested in this property..."
          />
          {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Send Enquiry</span>
          )}
        </button>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
}
