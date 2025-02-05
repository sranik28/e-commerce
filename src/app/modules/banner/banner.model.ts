import { model, Schema } from 'mongoose';
import { TBanner, TButton, TSpecialBanner } from './banner.interface';

// Define the TButton schema

// Define the TBanner schema
const BannerSchema = new Schema<TBanner>(
  {
    bannerImage: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const SpecialBannerSchema = new Schema<TSpecialBanner>(
  {
    bannerImage: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      ref: 'Product',
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);


export const SpecialBannerModel = model<TSpecialBanner>('SpecialBanner',SpecialBannerSchema)
// Create the Mongoose model for TBanner
export const BannerModel = model<TBanner>('Banner', BannerSchema);
