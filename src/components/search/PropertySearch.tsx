"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, Home, IndianRupee } from 'lucide-react';

export default function PropertySearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get('city') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [listingType, setListingType] = useState(searchParams.get('listingType') || 'Sale');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (city) params.set('city', city);
    if (propertyType) params.set('propertyType', propertyType);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (listingType) params.set('listingType', listingType);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto bg-surface rounded-2xl shadow-xl border border-border p-4 md:p-6 ${compact ? 'shadow-md' : 'shadow-2xl'}`}>
      {!compact && (
        <div className="flex items-center gap-4 mb-6 border-b border-border pb-4">
          <button 
            type="button"
            onClick={() => setListingType('Sale')}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${listingType === 'Sale' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
          >
            Buy
          </button>
          <button 
            type="button"
            onClick={() => setListingType('Rent')}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors ${listingType === 'Rent' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
          >
            Rent
          </button>
        </div>
      )}

      <form onSubmit={handleSearch} className={`grid grid-cols-1 gap-4 ${compact ? 'md:grid-cols-4' : 'md:grid-cols-4'} items-end`}>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-primary flex items-center gap-1.5">
            <MapPin size={16} className="text-accent" /> Location
          </label>
          <select 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary font-medium"
          >
            <option value="">All Cities</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Jodhpur">Jodhpur</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-primary flex items-center gap-1.5">
            <Home size={16} className="text-accent" /> Property Type
          </label>
          <select 
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary font-medium"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-primary flex items-center gap-1.5">
            <IndianRupee size={16} className="text-accent" /> Price Range
          </label>
          <div className="flex items-center gap-2">
            <select 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 h-12 px-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary text-sm font-medium"
            >
              <option value="">Min</option>
              <option value="2500000">₹25 L</option>
              <option value="5000000">₹50 L</option>
              <option value="10000000">₹1 Cr</option>
            </select>
            <span className="text-muted-foreground">-</span>
            <select 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 h-12 px-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-primary text-sm font-medium"
            >
              <option value="">Max</option>
              <option value="5000000">₹50 L</option>
              <option value="10000000">₹1 Cr</option>
              <option value="50000000">₹5 Cr</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          className="h-12 w-full rounded-xl bg-accent text-accent-foreground font-bold hover:bg-accent/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Search size={20} />
          <span>Search</span>
        </button>

      </form>
    </div>
  );
}
