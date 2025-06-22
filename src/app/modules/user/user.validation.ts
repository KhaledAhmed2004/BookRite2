import { z } from 'zod';

// Create User Schema
const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    phone_number: z.string({ required_error: 'Phone number is required' }).optional(),
    email: z.string({ required_error: 'Email is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' }),
    location: z.string({ required_error: 'Location is required' }).optional(),
    date_of_birth: z.string({ required_error: 'Date of birth is required' }).optional(),
    profile_picture: z.string().optional(),
    status: z.enum(['active', 'delete']).default('active'),
    address: z.string().optional(),
    gender: z.enum(['male', 'female']).optional(),
    is_verified: z.boolean().default(false),
  }),
});

// Update User Schema
const updateUserZodSchema = z.object({
  name: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  location: z.string().optional(),
  profile_picture: z.string().optional(),
  status: z.enum(['active', 'delete']).optional(),
  address: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  is_verified: z.boolean().optional(),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
