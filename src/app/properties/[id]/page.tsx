import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { MapPin, Bed, Bath, Square, CheckCircle2, ChevronLeft, Calendar } from 'lucide-react';
import mongoose from 'mongoose';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  await dbConnect();
  
  const { id } = await params;
  let query: any = {};
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { _id: id };
  } else {
    query = { slug: id };
  }

  const property = await Property.findOne(query).lean();

  if (!property) {
    return { title: 'Property Not Found' };
  }

  return {
    title: `${property.title} | Propgent`,
    description: property.description,
  };
}

export default async function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  
  const { id } = await params;
  let query: any = {};
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { _id: id };
  } else {
    query = { slug: id };
  }

  const property = await Property.findOne(query).lean();

  if (!property) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="container py-6">
        <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft size={16} /> Back to Search Results
        </Link>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left, 2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary flex-1">{property.title}</h1>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{formattedPrice}</div>
                  {property.listingType === 'Rent' && <div className="text-muted-foreground">per month</div>}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground font-medium mb-6">
                <MapPin size={20} className="text-accent" />
                <span>{property.address}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-full uppercase tracking-wider text-sm">
                  For {property.listingType}
                </span>
                <span className="bg-primary/5 text-primary font-bold px-4 py-2 rounded-full uppercase tracking-wider text-sm border border-primary/10">
                  {property.propertyType}
                </span>
                {property.featured && (
                  <span className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full uppercase tracking-wider text-sm border border-green-200">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Gallery */}
            <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px] md:h-[500px]">
              <div className="relative h-full md:col-span-1">
                <Image
                  src={property.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hidden md:grid grid-rows-2 gap-2 h-full">
                {property.images[1] ? (
                  <div className="relative h-full w-full">
                    <Image src={property.images[1]} alt="Gallery 1" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="bg-muted h-full w-full"></div>
                )}
                {property.images[2] ? (
                  <div className="relative h-full w-full">
                    <Image src={property.images[2]} alt="Gallery 2" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="bg-muted h-full w-full"></div>
                )}
              </div>
            </div>

            {/* Overview / Key Details */}
            <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm flex flex-wrap gap-8 justify-between">
              {property.bedrooms ? (
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground flex items-center gap-2"><Bed size={20}/> Bedrooms</span>
                  <span className="font-bold text-xl text-primary">{property.bedrooms}</span>
                </div>
              ) : null}
              {property.bathrooms ? (
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground flex items-center gap-2"><Bath size={20}/> Bathrooms</span>
                  <span className="font-bold text-xl text-primary">{property.bathrooms}</span>
                </div>
              ) : null}
              {property.area ? (
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground flex items-center gap-2"><Square size={20}/> Area</span>
                  <span className="font-bold text-xl text-primary">{property.area} <span className="text-base font-medium">{property.areaUnit}</span></span>
                </div>
              ) : null}
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground flex items-center gap-2"><Calendar size={20}/> Listed</span>
                <span className="font-bold text-xl text-primary">{new Date(property.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-6">Property Description</h3>
              <div className="prose prose-lg text-primary/80 max-w-none leading-relaxed">
                {property.description.split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Amenities & Features */}
            <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-6">Amenities & Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {[...(property.amenities || []), ...(property.features || [])].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-accent shrink-0" />
                    <span className="text-primary font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar (Right, 1/3 width) */}
          <div className="lg:col-span-1">
            <EnquiryForm propertyId={property._id.toString()} propertyTitle={property.title} />
          </div>

        </div>
      </div>
    </div>
  );
}
