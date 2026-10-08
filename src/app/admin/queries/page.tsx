import dbConnect from '@/lib/mongodb';
import PropertyQuery from '@/models/PropertyQuery';
import { connection } from 'next/server';
import PreviewPropertyModal from '@/components/admin/PreviewPropertyModal';
// Need to import Property model so Mongoose can populate
import '@/models/Property';

import { Suspense } from 'react';

export default function AdminQueries() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Enquiries</h1>
        <p className="text-gray-500 mt-2">Manage messages and property enquiries from customers.</p>
      </div>
      <Suspense fallback={<div className="text-gray-500">Loading enquiries...</div>}>
        <QueriesList />
      </Suspense>
    </div>
  );
}

async function QueriesList() {
  await connection();
  await dbConnect();
  
  const queries = await PropertyQuery.find()
    .sort({ createdAt: -1 })
    .populate('propertyId')
    .lean();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600 min-w-[900px]">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
          <tr>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Property</th>
            <th className="px-6 py-4 font-semibold">Message</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {queries.map((query: any) => (
            <tr key={query._id.toString()} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(query.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">{query.name}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <a href={`mailto:${query.email}`} className="text-accent hover:underline">{query.email}</a>
                  <span>{query.phone}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">
                {query.propertyId ? (
                  <PreviewPropertyModal 
                    property={JSON.parse(JSON.stringify(query.propertyId))} 
                    trigger={<span className="text-primary hover:underline cursor-pointer">{query.propertyId.title}</span>} 
                  />
                ) : (
                  <span className="text-gray-400">Deleted Property</span>
                )}
              </td>
              <td className="px-6 py-4 max-w-xs truncate" title={query.message}>
                {query.message}
              </td>
            </tr>
          ))}
          {queries.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No enquiries found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
