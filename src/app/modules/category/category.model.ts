import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';
// adjust path as needed

const categorySchema = new Schema<TCategory>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = model<TCategory>('Category', categorySchema);
