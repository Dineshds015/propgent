import mongoose, { Schema, Document } from 'mongoose';

export interface IPropertyQuery extends Document {
  propertyId: mongoose.Types.ObjectId;
  name: string;
  mobile: string;
  email?: string;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PropertyQuerySchema: Schema = new Schema(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true, index: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PropertyQuery || mongoose.model<IPropertyQuery>('PropertyQuery', PropertyQuerySchema);
