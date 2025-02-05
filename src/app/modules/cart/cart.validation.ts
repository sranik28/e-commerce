import { z } from 'zod';

const CartValidationSchema = z.object({
  body: z.object({
    product: z.string(),
    quantity: z.number(),
    size:z.string(),
    color:z.string(),
    isDeleted: z.boolean().default(false),
    isSell: z.boolean().default(false),
  }),
});

const CartUpdateValidationSchema = z.object({
  body: z.object({
    product: z.string().optional(),
    quantity: z.number().optional(),
    size:z.string().optional(),
    color:z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
    isSell: z.boolean().optional().default(false),
  }),
});

const ColorSizeValidationSchema = z.object({
  body:z.object({
    color:z.string(),
    size:z.string()
  })
})

export const CartValidation = {
  CartValidationSchema,
  CartUpdateValidationSchema,ColorSizeValidationSchema
};
