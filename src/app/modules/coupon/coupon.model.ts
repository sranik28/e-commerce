import { model, Schema } from 'mongoose';
import { TCoupon } from './coupon.interface';


const CouponSchema = new Schema<TCoupon>(
  {
    CODE: {
      type: String,
      required: true,
      unique: true,  // Assuming each coupon has a unique code
    },
    offer: {
      type: Number,
      required: true,
    },
    couponName: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['entire', 'custom'],
      required: true,
    },
    product: {
      type: [String],  // Refers to products
      ref: 'Product',  // Assuming ProductModel is named 'Product'
      default:[]
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt timestamps
  },
);

export const CouponModel = model<TCoupon>('Coupon', CouponSchema);
