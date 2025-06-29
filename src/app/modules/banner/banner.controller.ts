import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BannerService } from './banner.service';
import { getSingleFilePath } from '../../../shared/getFilePath';

// 🟢 Create a new banner
const createBanner = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 🧠 Step 1: Extract uploaded image file path from the 'image' field
    const image = getSingleFilePath(req.files, 'image');

    // 🧠 Step 2: Combine validated request body data with image URL
    const data = {
      image,
      ...req.body,
    };

    // 🧠 Step 3: Call the service layer to store banner in DB
    const result = await BannerService.createBanner(data);

    // 🧠 Step 4: Send a structured success response to the client
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Banner added successfully',
      data: result,
    });
  }
);

// 🟢 Get all banners
const getAllBanners = catchAsync(async (req: Request, res: Response) => {
  // 🧠 Step 1: Call service to fetch all banners from DB
  const result = await BannerService.getAllBanners();

  // 🧠 Step 2: Send the response with the fetched data
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All banners retrieved successfully',
    data: result,
  });
});

// 🟢 Update an existing banner by ID
const updateBanner = catchAsync(async (req: Request, res: Response) => {
  // 🧠 Step 1: Extract banner ID from route parameters
  const { bannerId } = req.params;

  // 🧠 Step 2: Extract uploaded image file path from the 'image' field (if any)
  const image = getSingleFilePath(req.files, 'image');

  // 🧠 Step 3: Combine validated request body data with image URL if available
  const data = {
    ...(image && { image }), // only add image if it exists
    ...req.body,
  };

  // 🧠 Step 4: Call service to update the banner in DB
  const result = await BannerService.updateBanner(bannerId, data);

  // 🧠 Step 5: Send a confirmation response
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Banner updated successfully',
    data: result,
  });
});

// 🟢 Delete a banner by ID
const deleteBanner = catchAsync(async (req: Request, res: Response) => {
  // 🧠 Step 1: Extract banner ID from route parameters
  const { bannerId } = req.params;

  // 🧠 Step 2: Call service to delete the banner from DB
  await BannerService.deleteBanner(bannerId);

  // 🧠 Step 3: Send deletion confirmation with null data
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Banner deleted successfully',
    data: null,
  });
});

// 🟢 Export all controller functions
export const BannerController = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
