import PropertyForm from '@/components/admin/PropertyForm';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import mongoose from 'mongoose';

import { Suspense } from 'react';

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div>
      <Suspense fallback={<div className="text-gray-500">Loading property...</div>}>
        <EditPropertyFormLoader params={params} />
      </Suspense>
    </div>
  );
}

async function EditPropertyFormLoader({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  await dbConnect();
  
  const { id } = await params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  const property = await Property.findById(id).lean();
  
  if (!property) {
    notFound();
  }

  const serializedProperty = {
    ...property,
    _id: property._id.toString(),
  };

  return (
    <>
      <h1 className="text-3xl font-heading font-bold text-primary mb-8">Edit Property: {property.title}</h1>
      <PropertyForm initialData={serializedProperty} />
    </>
  );
}
