// Define validation schema for TButton
import { z } from 'zod';

const BannerValidationSchema = z.object({
  body: z.object({
    bannerImage: z.string(),
    link: z.string(),
    isActive: z.boolean().optional().default(true),
  }),
});
const BannerUpdateValidationSchema = z.object({
  body: z.object({
    bannerImage: z.string().optional(),
    link: z.string().optional(),
    isActive: z.boolean().optional().default(true),
  }),
});
const SpecialBannerValidationSchema = z.object({
  body: z.object({
    bannerImage: z.string(),
    product: z.string(),
    time: z.string(),
  }),
});

const SpecialBannerUpdateValidationSchema = z.object({
  body: z.object({
    bannerImage: z.string().optional(),
    product: z.string().optional(),
    time: z.string().optional(),
  }),
});
export const SpecialBannerValidation = {
  SpecialBannerValidationSchema,
  SpecialBannerUpdateValidationSchema,
};

export const BannerValidation = {
  BannerValidationSchema,
  BannerUpdateValidationSchema,
};
