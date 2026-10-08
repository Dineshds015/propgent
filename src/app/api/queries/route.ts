import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import PropertyQuery from '@/models/PropertyQuery';
import Property from '@/models/Property';
import { propertyQuerySchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate the incoming request body
    const validatedData = propertyQuerySchema.parse(body);

    // Ensure the property exists if propertyId is provided
    if (validatedData.propertyId) {
      const propertyExists = await Property.exists({ _id: validatedData.propertyId });
      if (!propertyExists) {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      }
    }

    // Create the inquiry
    const newQuery = await PropertyQuery.create(validatedData);

    return NextResponse.json(
      { message: 'Enquiry submitted successfully', query: newQuery },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API /queries POST error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error', stack: error.stack }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const queries = await PropertyQuery.find().sort({ createdAt: -1 }).populate('propertyId', 'title');
    return NextResponse.json(queries, { status: 200 });
  } catch (error) {
    console.error('API /queries GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
