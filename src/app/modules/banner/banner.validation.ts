import { z } from 'zod';

const createBannerZodSchema = z.object({
  body: z.object({
    image_url: z.string({ required_error: 'Image is required' }),
    is_active: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateBannerZodSchema = z.object({
  body: z.object({
    image_url: z.string({ required_error: 'Image is required' }).optional(),
    is_active: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const BannerValidation = {
  createBannerZodSchema,
  updateBannerZodSchema,
};
