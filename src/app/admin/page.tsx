import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import PropertyQuery from '@/models/PropertyQuery';
import { Building, MessageSquare } from 'lucide-react';
import { connection } from 'next/server';

import { Suspense } from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold mb-8 text-primary">Dashboard Overview</h1>
      <Suspense fallback={<div className="text-gray-500">Loading stats...</div>}>
        <DashboardStats />
      </Suspense>
    </div>
  );
}

async function DashboardStats() {
  await connection();
  await dbConnect();
  
  const propertiesCount = await Property.countDocuments();
  const queriesCount = await PropertyQuery.countDocuments();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
          <Building size={28} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Properties</p>
          <p className="text-3xl font-bold text-gray-900">{propertiesCount}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-accent/20 text-accent flex items-center justify-center">
          <MessageSquare size={28} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Enquiries</p>
          <p className="text-3xl font-bold text-gray-900">{queriesCount}</p>
        </div>
      </div>
    </div>
  );
}
