import { z } from 'zod';

const giveRating = z.object({
  body: z.object({
    rating: z
      .number({ required_error: 'Rating is required' })
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot be more than 5'),
  }),
});
export const RatingValidationZodSchema = {
  giveRating,
};
