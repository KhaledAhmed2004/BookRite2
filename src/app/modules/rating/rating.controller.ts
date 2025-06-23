import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { RatingService } from './rating.service';

const createRating = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const userId = req.user.id;
  const { rating, comment } = req.body;

  const result = await RatingService.createRating(serviceId, userId, rating, comment);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Rating submitted successfully',
    data: result,
  });
});

const updateRating = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const userId = req.user.userId;
  const { rating, comment } = req.body;

  const result = await RatingService.updateRating(serviceId, userId, rating, comment);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Rating updated successfully',
    data: result,
  });
});

const deleteRating = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const userId = req.user.userId;

  const result = await RatingService.deleteRating(serviceId, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Rating deleted successfully',
    data: result,
  });
});

const getRatingsForService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await RatingService.getRatingsForService(serviceId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Ratings retrieved successfully',
    data: result,
  });
});

export const RatingController = {
  createRating,
  updateRating,
  deleteRating,
  getRatingsForService,
};
