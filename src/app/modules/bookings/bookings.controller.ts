import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BookingService } from './bookings.service';

const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const data = {
      ...req.body,
      userId,
    };

    const result = await BookingService.createBooking(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Booking created successfully',
      data: result,
    });
  }
);

// ✅ Get all Bookings
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookings();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

// ✅ Get a single Booking by ID
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const result = await BookingService.getSingleBooking(bookingId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

// ✅ Update a Booking by ID
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const result = await BookingService.updateBooking(bookingId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Booking updated successfully',
    data: result,
  });
});

// ✅ Delete a Booking by ID
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  await BookingService.deleteBooking(bookingId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Booking deleted successfully',
    data: null,
  });
});

// 👉 Accept a booking (status → confirmed)
const acceptBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await BookingService.changeBookingStatus(
    bookingId,
    'confirmed'
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking confirmed successfully',
    data: result,
  });
});

// 👉 Reject a booking (status → cancelled)
const rejectBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;

  const result = await BookingService.changeBookingStatus(
    bookingId,
    'cancelled'
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

// ✅ Export all Booking handlers
export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  acceptBooking,
  rejectBooking,
};
