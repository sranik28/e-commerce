import { z } from 'zod';

const categoryValidationSchema = z.object({
  body: z.object({
    icon: z.string(),
    title: z.string(),
    active:z.boolean().default(true)
  }),
});

const categoryUpdateValidationSchema = z.object({
  body: z.object({
    icon: z.string().optional(),
    title: z.string().optional(),
    active:z.boolean().default(true).optional()
  }),
});

export const CategoryValidation = {
  categoryValidationSchema,
  categoryUpdateValidationSchema,
};
