import { string, z } from 'zod';

// Zod schema for SideBarCategory
const SideBarCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    // href: z.string(),
    subItem: z.array(string()).default([]),
  }),
});

// Zod schema for SubSideBarCategory
const SubSideBarCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    // href: z.string(),
    refCategory: z.string(), // Assuming ObjectId as a string
    subItem: z.array(string()).default([]),
  }),
});

export const SideBarValidation = {
  SideBarCategoryValidationSchema,
  SubSideBarCategoryValidationSchema,
};
