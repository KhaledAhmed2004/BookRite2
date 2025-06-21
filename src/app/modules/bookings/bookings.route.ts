import express from 'express';
import { BookingController } from './bookings.controller';
import { BookingValidationZodSchema } from './bookings.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

//  Public  Get all bookings
router.get('/', BookingController.getAllBookings);

//  User Create a new booking
router.post(
  '/',
  validateRequest(BookingValidationZodSchema.createBooking),
  BookingController.createBooking
);

// User Update a booking by ID
router.patch(
  '/:bookingId',
  validateRequest(BookingValidationZodSchema.updateBooking),
  BookingController.updateBooking
);

// User  Delete a booking by ID
router.delete('/:bookingId', BookingController.deleteBooking);

export const BookingRoutes = router;
