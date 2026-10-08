import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';
import { propertySearchSchema } from '@/lib/validations';

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validatedData = propertySearchSchema.parse(queryParams);

    const {
      page,
      limit,
      city,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      bedrooms,
    } = validatedData;

    // Build MongoDB query
    const query: any = {};

    if (city) query.city = new RegExp(`^${city}$`, 'i');
    if (propertyType) query.propertyType = new RegExp(`^${propertyType}$`, 'i');
    if (listingType) query.listingType = new RegExp(`^${listingType}$`, 'i');
    if (bedrooms) query.bedrooms = { $gte: bedrooms };

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [data, total] = await Promise.all([
      Property.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Property.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        data,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('API /properties GET error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // In a real app we should validate with Zod here
    const newProperty = await Property.create(body);
    
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error: any) {
    console.error('API /properties POST error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
