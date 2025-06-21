import { z } from 'zod';

// Create Service Category
const createServiceCategoryZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(1, 'Name cannot be empty'),
    img: z
      .string({ required_error: 'Image URL is required' })
      .url('Invalid image URL format'),
  }),
});

// Update Service Category
const updateServiceCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    img: z.string().optional(),
  }),
});

export const ServiceCategoryValidation = {
  createServiceCategoryZodSchema,
  updateServiceCategoryZodSchema,
};
