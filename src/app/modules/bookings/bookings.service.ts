import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { BookingModel } from './bookings.model';
import { TBooking } from './bookings.interfacet';
import { ServiceModel } from '../service/service.model';
import mongoose from 'mongoose';

// ✅ Create a new Booking
const createBooking = async (payload: TBooking) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, serviceId, date, timeSlot } = payload;

    // 1. Check if the service exists
    const service = await ServiceModel.findById(serviceId).session(session);
    if (!service) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
    }

    // 2. Check if the slot is already booked (availability check)
    const isSlotTaken = service.bookedSlotes.some(
      slot => slot.date === date && slot.timeSlot === timeSlot
    );

    if (isSlotTaken) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        'This slot is already booked for this service'
      );
    }

    // 3. Check for duplicate booking by same user
    const duplicateBooking = await BookingModel.findOne({
      userId,
      serviceId,
      date,
      timeSlot,
    }).session(session);

    if (duplicateBooking) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        'You have already booked this slot'
      );
    }

    // 4. Create the booking
    const createdBooking = await BookingModel.create([payload], { session });
    if (!createdBooking.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create booking');
    }

    // 5. Push booked slot to ServiceModel
    const updateService = await ServiceModel.updateOne(
      { _id: serviceId },
      {
        $push: {
          bookedSlotes: {
            date,
            timeSlot,
          },
        },
      },
      { session }
    );

    if (updateService.modifiedCount === 0) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Failed to update service with booked slot'
      );
    }

    await session.commitTransaction();
    session.endSession();

    return createdBooking[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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

// 👉 Change booking status (used for accept/reject)
const changeBookingStatus = async (
  bookingId: string,
  status: 'confirmed' | 'cancelled'
) => {
  const updatedBooking = await BookingModel.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );

  if (!updatedBooking) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
  }

  return updatedBooking;
};
export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  changeBookingStatus,
};
