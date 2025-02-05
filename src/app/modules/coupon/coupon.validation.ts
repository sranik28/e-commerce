import { z } from 'zod';

// Coupon validation schema
const CouponValidationSchema = z.object({
  body: z.object({
    CODE: z.string(),
    offer: z.number(),
    couponName: z.string(),
    limit: z.number(),
    type: z.enum(['entire', 'custom']),
    product: z.array(z.string()).default([]),  // Assuming product IDs are strings
  }),
});

// Update Coupon validation schema
const CouponUpdateValidationSchema = z.object({
  body: z.object({
    CODE: z.string().optional(),
    offer: z.number().optional(),
    couponName: z.string().optional(),
    limit: z.number().optional(),
    type: z.enum(['entire', 'custom']).optional(),
    product: z.array(z.string()).optional(),
  }),
});

export const CouponValidation = {
  CouponValidationSchema,
  CouponUpdateValidationSchema,
};