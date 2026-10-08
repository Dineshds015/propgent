import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { connection } from 'next/server';
import Link from 'next/link';
import { Plus, Edit, Eye } from 'lucide-react';
import DeletePropertyButton from '@/components/admin/DeletePropertyButton';
import PreviewPropertyModal from '@/components/admin/PreviewPropertyModal';

import { Suspense } from 'react';

export default function AdminProperties() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Properties</h1>
        <Link href="/admin/properties/new" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium">
          <Plus size={20} /> Add Property
        </Link>
      </div>
      <Suspense fallback={<div className="text-gray-500">Loading properties...</div>}>
        <PropertiesList />
      </Suspense>
    </div>
  );
}

async function PropertiesList() {
  await connection();
  await dbConnect();
  
  const properties = await Property.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600 min-w-[800px]">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
          <tr>
            <th className="px-6 py-4 font-semibold">Title</th>
            <th className="px-6 py-4 font-semibold">City</th>
            <th className="px-6 py-4 font-semibold">Type</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {properties.map((property: any) => (
            <tr key={property._id.toString()} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{property.title}</td>
              <td className="px-6 py-4">{property.city}</td>
              <td className="px-6 py-4">{property.propertyType}</td>
              <td className="px-6 py-4">₹{property.price.toLocaleString('en-IN')}</td>
              <td className="px-6 py-4 text-right space-x-3">
                <PreviewPropertyModal 
                  property={JSON.parse(JSON.stringify(property))} 
                  trigger={
                    <button className="inline-flex items-center text-gray-500 hover:text-gray-700" title="Preview">
                      <Eye size={18} />
                    </button>
                  } 
                />
                <Link href={`/admin/properties/${property._id.toString()}/edit`} className="inline-flex items-center text-blue-600 hover:text-blue-800" title="Edit">
                  <Edit size={18} />
                </Link>
                <DeletePropertyButton id={property._id.toString()} title={property.title} />
              </td>
            </tr>
          ))}
          {properties.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No properties found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
