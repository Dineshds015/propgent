import { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import PropertyCard from '@/components/property/PropertyCard';
import PropertySearch from '@/components/search/PropertySearch';
import { propertySearchSchema } from '@/lib/validations';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Properties | Propgent',
  description: 'Search and filter through our extensive list of premium properties.',
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await dbConnect();
  
  const resolvedSearchParams = await searchParams;

  // Parse and validate search parameters
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page, 10) : 1;
  const limit = 12;

  const validParams = {
    page,
    limit,
    city: typeof resolvedSearchParams.city === 'string' ? resolvedSearchParams.city : undefined,
    propertyType: typeof resolvedSearchParams.propertyType === 'string' ? resolvedSearchParams.propertyType : undefined,
    listingType: typeof resolvedSearchParams.listingType === 'string' ? resolvedSearchParams.listingType : undefined,
    minPrice: typeof resolvedSearchParams.minPrice === 'string' ? parseInt(resolvedSearchParams.minPrice, 10) : undefined,
    maxPrice: typeof resolvedSearchParams.maxPrice === 'string' ? parseInt(resolvedSearchParams.maxPrice, 10) : undefined,
  };

  const parsed = propertySearchSchema.safeParse(validParams);
  const filterParams = parsed.success ? parsed.data : { page, limit };

  // Build Query
  const query: any = {};
  if (filterParams.city) query.city = new RegExp(`^${filterParams.city}$`, 'i');
  if (filterParams.propertyType) query.propertyType = new RegExp(`^${filterParams.propertyType}$`, 'i');
  if (filterParams.listingType) query.listingType = new RegExp(`^${filterParams.listingType}$`, 'i');
  
  if (filterParams.minPrice !== undefined || filterParams.maxPrice !== undefined) {
    query.price = {};
    if (filterParams.minPrice !== undefined) query.price.$gte = filterParams.minPrice;
    if (filterParams.maxPrice !== undefined) query.price.$lte = filterParams.maxPrice;
  }

  const skip = (filterParams.page - 1) * filterParams.limit;

  const [properties, total] = await Promise.all([
    Property.find(query).sort({ createdAt: -1 }).skip(skip).limit(filterParams.limit).lean(),
    Property.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / filterParams.limit);

  // Serialize IDs
  const serializedProperties = properties.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  // Build pagination links
  const createPageUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (filterParams.city) params.set('city', filterParams.city);
    if (filterParams.propertyType) params.set('propertyType', filterParams.propertyType);
    if (filterParams.listingType) params.set('listingType', filterParams.listingType);
    if (filterParams.minPrice) params.set('minPrice', filterParams.minPrice.toString());
    if (filterParams.maxPrice) params.set('maxPrice', filterParams.maxPrice.toString());
    params.set('page', newPage.toString());
    return `/properties?${params.toString()}`;
  };

  return (
    <div className="bg-muted min-h-screen pb-24">
      {/* Search Header */}
      <div className="bg-primary text-primary-foreground pt-12 pb-24">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold mb-6 text-white">Search Properties</h1>
          <p className="text-white/80 mb-8 max-w-2xl">Find exactly what you're looking for with our advanced search.</p>
        </div>
      </div>

      {/* Search Component (Overlapping) */}
      <div className="container -mt-12 mb-16 relative z-10">
        <PropertySearch compact />
      </div>

      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary">
            {total} {total === 1 ? 'Property' : 'Properties'} Found
          </h2>
        </div>

        {serializedProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {serializedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {filterParams.page > 1 ? (
                  <Link href={createPageUrl(filterParams.page - 1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-primary hover:bg-muted transition-colors">
                    <ChevronLeft size={20} />
                  </Link>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface opacity-50 cursor-not-allowed">
                    <ChevronLeft size={20} />
                  </div>
                )}
                
                <div className="flex items-center gap-2 px-4">
                  <span className="font-bold text-primary">Page {filterParams.page}</span>
                  <span className="text-muted-foreground">of {totalPages}</span>
                </div>

                {filterParams.page < totalPages ? (
                  <Link href={createPageUrl(filterParams.page + 1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-primary hover:bg-muted transition-colors">
                    <ChevronRight size={20} />
                  </Link>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface opacity-50 cursor-not-allowed">
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="bg-surface rounded-2xl p-16 text-center border border-border shadow-sm">
            <h3 className="text-2xl font-bold text-primary mb-4">No properties found</h3>
            <p className="text-muted-foreground mb-8">Try adjusting your search criteria to find what you're looking for.</p>
            <Link href="/properties" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors">
              Clear All Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
