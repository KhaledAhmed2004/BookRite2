import { z } from 'zod';

const createPortfolio = z.object({
  title: z.string({ required_error: 'Title is required' }).trim(),
  provider: z.string({ required_error: 'Provider ID is required' }),
  img: z.string({ required_error: 'Image is required' }),
});

const updatePortfolio = z.object({
  title: z.string().trim().optional(),
  provider: z.string().optional(),
  img: z.string().optional(),
});

export const PortfolioValidationSchema = {
  createService: createPortfolio,
  updateService: updatePortfolio,
};
