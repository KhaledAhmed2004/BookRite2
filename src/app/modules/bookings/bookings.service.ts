import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { BookingModel } from './bookings.model';
import { TBooking } from './bookings.interfacet';
import { JwtPayload } from 'jsonwebtoken';

// ✅ Create a new Booking
const createBooking = async (payload: TBooking) => {
  const created = await BookingModel.create(payload);

  if (!created) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create booking');
  }

  return created;
};

// ✅ Get all Bookings
const getAllBookings = async () => {
  const bookings = await BookingModel.find();

  if (!bookings.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No bookings found');
  }

  return bookings;
};

// ✅ Get a single Booking by ID
const getSingleBooking = async (id: string) => {
  const booking = await BookingModel.findById(id);

  if (!booking) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
  }

  return booking;
};

// ✅ Update a Booking by ID
const updateBooking = async (bookingId: string, payload: Partial<TBooking>) => {
  const updated = await BookingModel.findByIdAndUpdate(bookingId, payload, {
    new: true,
  });

  if (!updated) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update booking');
  }

  return updated;
};

// ✅ Delete a Booking by ID
const deleteBooking = async (bookingId: string) => {
  const existing = await BookingModel.findById(bookingId);

  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
  }

  await BookingModel.findByIdAndDelete(bookingId);
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
