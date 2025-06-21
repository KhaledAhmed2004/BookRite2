import { z } from 'zod';

const createService = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    category: z.string({ required_error: 'Category ID is required' }),
    status: z.enum(['active', 'inactive']).optional(),
    img: z.string().trim().optional(),
    address: z.string().trim().optional(),
    description: z.string().trim().optional(),
    price: z
      .number({ required_error: 'Price is required' })
      .nonnegative('Price must be zero or greater'),
    is_trending: z.boolean().optional(),
    is_recommended: z.boolean().optional(),
  }),
});

const updateService = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    category: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
    img: z.string().trim().optional(),
    address: z.string().trim().optional(),
    description: z.string().trim().optional(),
    price: z.number().nonnegative('Price must be zero or greater').optional(),
    is_trending: z.boolean().optional(),
    is_recommended: z.boolean().optional(),
  }),
});


export const ServiceValidationSchema = {
  createService,
  updateService
};
