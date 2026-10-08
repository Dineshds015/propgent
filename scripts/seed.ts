import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Property from '../src/models/Property';

// Load environment variables from .env.local or .env
dotenv.config({ path: '.env.local' });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: '.env' });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const rawProperties = [
  {
    title: 'Modern 3 BHK Apartment in Jaipur',
    slug: 'modern-3-bhk-apartment-jaipur',
    description: 'A beautiful, modern 3 BHK apartment located in the heart of Jaipur with excellent amenities and city views.',
    price: 8500000,
    propertyType: 'Apartment',
    listingType: 'Sale',
    city: 'Jaipur',
    locality: 'Malviya Nagar',
    address: '123 Avenue, Malviya Nagar, Jaipur, Rajasthan 302017',
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    areaUnit: 'sq.ft',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1c29440404?q=80&w=1974&auto=format&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Power Backup', 'Parking'],
    features: ['Balcony', 'Modular Kitchen', 'Vaastu Compliant'],
    featured: true,
    status: 'available',
  },
  {
    title: 'Luxury Villa in Jodhpur',
    slug: 'luxury-villa-jodhpur',
    description: 'Experience royalty in this magnificent 5 BHK luxury villa in Jodhpur. Features a private pool and huge lawn.',
    price: 25000000,
    propertyType: 'Villa',
    listingType: 'Sale',
    city: 'Jodhpur',
    locality: 'Ratanada',
    address: '45 Palace Road, Ratanada, Jodhpur, Rajasthan 342011',
    bedrooms: 5,
    bathrooms: 6,
    area: 4500,
    areaUnit: 'sq.ft',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'
    ],
    amenities: ['Private Pool', 'Garden', 'Club House', '24/7 Security'],
    features: ['Servant Quarters', 'Private Terrace', 'Central AC'],
    featured: true,
    status: 'available',
  },
  {
    title: 'Affordable 2 BHK Flat in Ahmedabad',
    slug: 'affordable-2-bhk-flat-ahmedabad',
    description: 'Perfect for small families. A well-maintained 2 BHK flat near schools and hospitals.',
    price: 4500000,
    propertyType: 'Apartment',
    listingType: 'Sale',
    city: 'Ahmedabad',
    locality: 'Satellite',
    address: '78 Ring Road, Satellite, Ahmedabad, Gujarat 380015',
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    areaUnit: 'sq.ft',
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['Gym', 'Children Play Area', 'Lifts'],
    features: ['Corner Flat', 'East Facing'],
    featured: false,
    status: 'available',
  },
  {
    title: 'Spacious Independent House in Delhi',
    slug: 'spacious-independent-house-delhi',
    description: 'A newly built independent house in South Delhi with premium fittings and ample parking space.',
    price: 45000000,
    propertyType: 'House',
    listingType: 'Sale',
    city: 'Delhi',
    locality: 'Vasant Vihar',
    address: 'Block C, Vasant Vihar, New Delhi 110057',
    bedrooms: 4,
    bathrooms: 5,
    area: 3200,
    areaUnit: 'sq.ft',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    ],
    amenities: ['Gated Community', 'Park', 'Security'],
    features: ['Basement', 'Terrace Garden'],
    featured: true,
    status: 'available',
  },
  {
    title: 'Premium Office Space for Rent in Mumbai',
    slug: 'premium-office-space-mumbai',
    description: 'Fully furnished office space in the commercial hub of Mumbai. Ideal for IT companies and startups.',
    price: 250000,
    propertyType: 'Commercial',
    listingType: 'Rent',
    city: 'Mumbai',
    locality: 'Andheri East',
    address: 'Tech Park, Andheri East, Mumbai, Maharashtra 400069',
    bedrooms: 0,
    bathrooms: 4,
    area: 5000,
    areaUnit: 'sq.ft',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop'
    ],
    amenities: ['Central AC', 'Cafeteria', 'Conference Rooms', '24/7 Access'],
    features: ['Fully Furnished', 'Workstations', 'Cabins'],
    featured: false,
    status: 'available',
  },
  {
    title: 'Cozy 1 BHK Studio in Pune',
    slug: 'cozy-1-bhk-studio-pune',
    description: 'A cozy and compact 1 BHK studio apartment, perfect for bachelors and students. Located near IT park.',
    price: 15000,
    propertyType: 'Apartment',
    listingType: 'Rent',
    city: 'Pune',
    locality: 'Hinjewadi',
    address: 'Phase 1, Hinjewadi, Pune, Maharashtra 411057',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    areaUnit: 'sq.ft',
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=2071&auto=format&fit=crop'
    ],
    amenities: ['Security', 'Lifts', 'Parking'],
    features: ['Semi-Furnished'],
    featured: false,
    status: 'available',
  }
];

async function uploadImageToCloudinary(imageUrl: string) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'propgent_properties',
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Failed to upload image ${imageUrl} to Cloudinary:`, error);
    return imageUrl; // Fallback to original URL if upload fails
  }
}

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB.');

    console.log('Clearing existing properties...');
    await Property.deleteMany({});
    console.log('Cleared existing properties.');

    console.log('Uploading images to Cloudinary and preparing properties...');
    const propertiesWithCloudinaryImages = await Promise.all(
      rawProperties.map(async (property) => {
        const uploadedImages = await Promise.all(
          property.images.map(img => uploadImageToCloudinary(img))
        );
        return {
          ...property,
          images: uploadedImages
        };
      })
    );

    console.log('Inserting seed properties...');
    const inserted = await Property.insertMany(propertiesWithCloudinaryImages);
    console.log(`Successfully inserted ${inserted.length} properties!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
