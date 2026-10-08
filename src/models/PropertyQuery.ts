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
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: false, index: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

// Delete cached model to ensure schema updates take effect during Next.js HMR
delete mongoose.models.PropertyQuery;
export default mongoose.model<IPropertyQuery>('PropertyQuery', PropertyQuerySchema);
