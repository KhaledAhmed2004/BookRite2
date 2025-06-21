import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BannerService } from './banner.service';
import { getSingleFilePath } from '../../../shared/getFilePath';

// Create a new banner
const createBanner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let image_url = getSingleFilePath(req.files, 'image');
    const data = {
      image_url,
      ...req.body,
    };

    const result = await BannerService.createBanner(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Banner added successfully',
      data: result,
    });
  }
);

// Get all banners
const getAllBanners = catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.getAllBanners();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All banners retrieved successfully',
    data: result,
  });
});

// Get a single banner by ID
const getSingleBanner = catchAsync(async (req: Request, res: Response) => {
  const { bannerId } = req.params;
  const result = await BannerService.getSingleBanner(bannerId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single banner retrieved successfully',
    data: result,
  });
});

// Update a banner by ID
const updateBanner = catchAsync(async (req: Request, res: Response) => {
  const { bannerId } = req.params;
  const data = req.body;
  const result = await BannerService.updateBanner(bannerId, data);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Banner updated successfully',
    data: result,
  });
});

// Delete a banner by ID
const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  const { bannerId } = req.params;
  await BannerService.deleteBanner(bannerId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Banner deleted successfully',
    data: null,
  });
});

export const BannerController = {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
