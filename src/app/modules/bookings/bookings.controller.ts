import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BookingService } from './bookings.service';

// ✅ Create a new Booking
const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingService.createBooking(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Booking created successfully',
      data: result,
    });
  }
);

// ✅ Get all Bookings (admin)
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

// ✅ Export all Booking handlers
export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
