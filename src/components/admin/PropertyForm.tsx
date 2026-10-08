'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IProperty } from '@/models/Property';

export default function PropertyForm({ initialData }: { initialData?: Partial<IProperty> & { _id?: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!initialData?._id;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      propertyType: formData.get('propertyType'),
      listingType: formData.get('listingType'),
      city: formData.get('city'),
      locality: formData.get('locality'),
      address: formData.get('address'),
      bedrooms: Number(formData.get('bedrooms')),
      bathrooms: Number(formData.get('bathrooms')),
      area: Number(formData.get('area')),
      areaUnit: 'sq.ft',
      images: (formData.get('images') as string).split(',').map(s => s.trim()).filter(Boolean),
      status: formData.get('status'),
      featured: formData.get('featured') === 'on',
    };

    try {
      const url = isEdit ? `/api/properties/${initialData._id}` : '/api/properties';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to save property');
      }

      router.push('/admin/properties');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input required type="text" name="title" defaultValue={initialData?.title} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input required type="text" name="slug" defaultValue={initialData?.slug} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea required name="description" defaultValue={initialData?.description} rows={4} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none"></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
          <input required type="number" name="price" defaultValue={initialData?.price} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select name="propertyType" defaultValue={initialData?.propertyType || 'Apartment'} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
          <select name="listingType" defaultValue={initialData?.listingType || 'Sale'} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input required type="text" name="city" defaultValue={initialData?.city} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
          <input required type="text" name="locality" defaultValue={initialData?.locality} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
        <input required type="text" name="address" defaultValue={initialData?.address} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <input required type="number" name="bedrooms" defaultValue={initialData?.bedrooms} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <input required type="number" name="bathrooms" defaultValue={initialData?.bathrooms} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area (sq.ft)</label>
          <input required type="number" name="area" defaultValue={initialData?.area} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
        <textarea name="images" defaultValue={initialData?.images?.join(', ')} rows={3} placeholder="https://image1.jpg, https://image2.jpg" className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none"></textarea>
      </div>

      <div className="flex items-center gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" defaultValue={initialData?.status || 'available'} className="w-full rounded-md border border-gray-300 p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>
        <div className="flex items-center mt-6">
          <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-5 h-5 rounded text-primary focus:ring-primary" />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">Mark as Featured</label>
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <button type="submit" disabled={loading} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-bold hover:bg-primary/90 transition-colors disabled:opacity-70">
          {loading ? 'Saving...' : (isEdit ? 'Update Property' : 'Create Property')}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md font-bold hover:bg-gray-300 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
