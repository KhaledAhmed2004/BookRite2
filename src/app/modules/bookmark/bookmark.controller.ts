import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BookmarkService } from './bookmark.service';

// Create bookmark
const createBookmark = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const serviceId = req.params.serviceId;

  const result = await BookmarkService.createBookmark(userId, serviceId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookmark added successfully',
    data: result,
  });
});

// Get all bookmarks
const getAllBookmarks = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;

  const result = await BookmarkService.getAllBookmarks(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookmarks retrieved successfully',
    data: result,
  });
});

// Delete bookmark
const deleteBookmark = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const serviceId = req.params.serviceId;

  const result = await BookmarkService.deleteBookmark(userId, serviceId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookmark removed successfully',
    data: result,
  });
});

export const BookmarkController = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark,
};
