import express from 'express';
import { BookingController } from './bookings.controller';
import { BookingValidationZodSchema } from './bookings.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

//  Public  Get all bookings
router.get('/', BookingController.getAllBookings);

//  User Create a new booking
router.post(
  '/',
  auth(USER_ROLES.USER),
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

// Admin/Provider Accept a booking
router.patch(
  '/:bookingId/accept',
  auth(USER_ROLES.PROVIDER),
  BookingController.acceptBooking
);

// Admin/Provider Reject a booking
router.patch(
  '/:bookingId/reject',
  auth(USER_ROLES.PROVIDER),
  BookingController.rejectBooking
);

export const BookingRoutes = router;
