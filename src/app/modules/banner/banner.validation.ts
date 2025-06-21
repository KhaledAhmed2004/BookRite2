import { z } from 'zod';

const createBannerZodSchema = z.object({
  body: z.object({
    image_url: z
      .string({ required_error: 'Image URL is required' })
      .url('Invalid URL format'),
    is_active: z.boolean(),
  }),
});

const updateBannerZodSchema = z.object({
  image_url: z.string().url('Invalid URL format').optional(),
  is_active: z.boolean().optional(),
});

export const BannerValidation = {
  createBannerZodSchema,
  updateBannerZodSchema,
};
