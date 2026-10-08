import { z } from 'zod';
import mongoose from 'mongoose';

// Validation for property search queries
export const propertySearchSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(50).optional().default(12),
  city: z.string().optional(),
  propertyType: z.string().optional(),
  listingType: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  bedrooms: z.coerce.number().min(1).optional(),
});

// Validation for property inquiry submission
export const propertyQuerySchema = z.object({
  propertyId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid property ID',
  }),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  message: z.string().max(1000).optional(),
});
