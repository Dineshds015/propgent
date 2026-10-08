'use client';

import { useState } from 'react';
import { X, MapPin, Bed, Bath, Square, Building, Tag } from 'lucide-react';
import Image from 'next/image';

export default function PreviewPropertyModal({ property, trigger }: { property: any, trigger: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!property) return null;

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in duration-200 text-left">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-heading font-bold text-gray-900 truncate pr-4">{property.title}</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors shrink-0"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image */}
              {property.images && property.images.length > 0 ? (
                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-6 bg-gray-100">
                  <Image 
                    src={property.images[0]} 
                    alt={property.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    {property.listingType}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    ₹{property.price?.toLocaleString('en-IN')}
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-xl mb-6 flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}

              {/* Grid Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-1"><MapPin size={16} className="mr-2" /> City</div>
                  <div className="font-semibold text-gray-900">{property.city}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-1"><Building size={16} className="mr-2" /> Type</div>
                  <div className="font-semibold text-gray-900">{property.propertyType}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-1"><Tag size={16} className="mr-2" /> Status</div>
                  <div className="font-semibold text-gray-900 capitalize">{property.status}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center text-gray-500 mb-1"><MapPin size={16} className="mr-2" /> Locality</div>
                  <div className="font-semibold text-gray-900 truncate" title={property.locality}>{property.locality}</div>
                </div>
              </div>

              {/* Specs */}
              <div className="flex gap-6 mb-8 py-4 border-y border-gray-100">
                <div className="flex items-center text-gray-700">
                  <Bed size={20} className="mr-2 text-primary" />
                  <span className="font-bold mr-1">{property.bedrooms}</span> Beds
                </div>
                <div className="flex items-center text-gray-700">
                  <Bath size={20} className="mr-2 text-primary" />
                  <span className="font-bold mr-1">{property.bathrooms}</span> Baths
                </div>
                <div className="flex items-center text-gray-700">
                  <Square size={20} className="mr-2 text-primary" />
                  <span className="font-bold mr-1">{property.area}</span> {property.areaUnit || 'sq.ft'}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{property.description}</p>
              </div>
              
              {/* Address */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-500 mb-1">Full Address</h3>
                <p className="text-gray-900">{property.address}</p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 text-right">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
