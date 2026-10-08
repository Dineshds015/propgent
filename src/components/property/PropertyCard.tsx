import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { IProperty } from '@/models/Property';

interface PropertyCardProps {
  property: Partial<IProperty> & { _id: string };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link 
      href={`/properties/${property.slug || property._id}`}
      className="group block rounded-2xl bg-surface border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop'}
          alt={property.title || 'Property'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            For {property.listingType}
          </span>
          {property.featured && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 h-10 w-10 bg-white/90 rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm z-10">
          <Heart size={20} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-heading font-bold text-lg text-primary line-clamp-1 flex-1">
            {property.title}
          </h3>
          <p className="font-bold text-xl text-primary shrink-0">
            ₹{property.price?.toLocaleString('en-IN')}
            {property.listingType === 'Rent' && <span className="text-sm text-muted-foreground font-normal">/mo</span>}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
          <MapPin size={16} className="shrink-0" />
          <span className="line-clamp-1">{property.locality}, {property.city}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-primary pt-4 border-t border-border">
          {property.bedrooms ? (
            <div className="flex items-center gap-1.5 font-medium">
              <Bed size={18} className="text-muted-foreground" />
              <span>{property.bedrooms} Beds</span>
            </div>
          ) : null}
          {property.bathrooms ? (
            <div className="flex items-center gap-1.5 font-medium">
              <Bath size={18} className="text-muted-foreground" />
              <span>{property.bathrooms} Baths</span>
            </div>
          ) : null}
          {property.area ? (
            <div className="flex items-center gap-1.5 font-medium">
              <Square size={18} className="text-muted-foreground" />
              <span>{property.area} {property.areaUnit}</span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
