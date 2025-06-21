import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';

const createBookmark = async (userId: string, serviceId: string) => {
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid service ID');
  }

  const user = await User.findById(userId);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

  const alreadyBookmarked = user.bookmarks?.some(
    id => id.toString() === serviceId
  );

  if (alreadyBookmarked) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Already bookmarked');
  }

  user.bookmarks?.push(new mongoose.Types.ObjectId(serviceId));
  await user.save();

  return user.bookmarks;
};

const getAllBookmarks = async (userId: string) => {
  const user = await User.findById(userId)
    .populate('bookmarks') // fetch full service details
    .select('bookmarks');

  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

  return user.bookmarks;
};

const deleteBookmark = async (userId: string, serviceId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');

  user.bookmarks = user.bookmarks?.filter(id => id.toString() !== serviceId);
  await user.save();

  return user.bookmarks;
};

export const BookmarkService = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
};
