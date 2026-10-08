import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  propertyType: string;
  listingType: string;
  city: string;
  locality: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  images: string[];
  amenities: string[];
  features: string[];
  featured: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    propertyType: { type: String, required: true, index: true }, // e.g., Apartment, Villa, House
    listingType: { type: String, required: true, index: true }, // e.g., Sale, Rent
    city: { type: String, required: true, index: true },
    locality: { type: String, required: true },
    address: { type: String, required: true },
    bedrooms: { type: Number, required: true, index: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    areaUnit: { type: String, default: 'sq.ft' },
    images: { type: [String], required: true },
    amenities: { type: [String], default: [] },
    features: { type: [String], default: [] },
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, default: 'available' },
  },
  {
    timestamps: true,
  }
);

// Compound index for common search queries
PropertySchema.index({ city: 1, propertyType: 1, listingType: 1, price: 1 });

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
