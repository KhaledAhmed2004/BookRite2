import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { BookingModel } from '../bookings/bookings.model';

const createBookmark = async (userId: string, serviceId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

  const alreadyBookmarked = user.bookmarks?.some(
    id => id.toString() === serviceId
  );

  if (alreadyBookmarked) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Already bookmarked');
  }

  await User.updateOne(
    { _id: userId },
    { $addToSet: { bookmarks: serviceId } }
  );

  // return user.bookmarks;
  const updatedUser = await User.findById(userId).populate('bookmarks');
  return updatedUser?.bookmarks;
};

const getAllBookmarks = async (userId: string) => {
  const user = await User.findById(userId)
    .populate('bookmarks') // fetch full service details
    .select('bookmarks');

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

  return user.bookmarks;
};

const deleteBookmark = async (userId: string, serviceId: string) => {
  // ✅ Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // ✅ Remove the serviceId from bookmarks array using $pull
  await User.updateOne({ _id: userId }, { $pull: { bookmarks: serviceId } });

  // ✅ Return updated bookmarks with populated service info
  const updatedUser = await User.findById(userId).populate('bookmarks');

  return updatedUser?.bookmarks;
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

export const BookmarkService = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
  changeBookingStatus,
};
