import { z } from 'zod';

// Create Booking
const createBooking = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User ID is required' }),
    providerId: z.string({ required_error: 'Provider ID is required' }),
    serviceId: z.string({ required_error: 'Service ID is required' }),
    date: z.string({ required_error: 'Date is required' }),
    timeSlot: z
      .string({ required_error: 'Time slot is required' })
      .min(1, 'Time slot cannot be empty'),
    status: z.enum(['confirmed', 'pending', 'cancelled']),
  }),
});

// Update Booking (e.g., status update or rescheduling)
const updateBooking = z.object({
  body: z.object({
    date: z.string().optional(),
    timeSlot: z.string().optional(),
    status: z.enum(['confirmed', 'pending', 'cancelled']).optional(),
  }),
});

export const BookingValidationZodSchema = {
  createBooking,
  updateBooking,
};
