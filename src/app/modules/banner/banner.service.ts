import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { Banner } from './banner.model';
import { TBanner } from './banner.interface';

// 🟢 Create a new banner
const createBanner = async (payload: TBanner): Promise<TBanner> => {
  // 🧠 Step 1: Attempt to create a new banner in the database
  const createdBanner = await Banner.create(payload);

  // 🧠 Step 2: Throw error if creation fails
  if (!createdBanner) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create banner');
  }

  // 🧠 Step 3: Return the newly created banner
  return createdBanner;
};

// 🟢 Get all banners
const getAllBanners = async (): Promise<TBanner[]> => {
  // 🧠 Step 1: Fetch all banners from DB
  const banners = await Banner.find();

  // 🧠 Step 2: Throw error if no banners exist
  if (!banners.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No banners found');
  }

  // 🧠 Step 3: Return banner list
  return banners;
};

// 🟢 Update a banner by ID
const updateBanner = async (
  id: string,
  payload: Partial<TBanner>
): Promise<TBanner> => {
  // 🧠 Step 1: Check if the banner exists
  const existingBanner = await Banner.findById(id);

  // 🧠 Step 2: Throw error if not found
  if (!existingBanner) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Banner not found');
  }

  // 🧠 Step 3: If a new image is provided, delete the old one
  if (payload.image && existingBanner.image) {
    unlinkFile(existingBanner.image);
  }

  // 🧠 Step 4: Update the banner with new data
  const updatedBanner = await Banner.findByIdAndUpdate(id, payload, {
    new: true,
  });

  // 🧠 Step 5: Throw error if update fails
  if (!updatedBanner) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update banner');
  }

  // 🧠 Step 6: Return the updated banner
  return updatedBanner;
};

// 🟢 Delete a banner by ID
const deleteBanner = async (bannerId: string): Promise<void> => {
  // 🧠 Step 1: Check if the banner exists
  const existingBanner = await Banner.findById(bannerId);

  // 🧠 Step 2: Throw error if not found
  if (!existingBanner) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Banner not found');
  }

  // 🧠 Step 3: Delete the image file if it exists
  if (existingBanner.image) {
    unlinkFile(existingBanner.image);
  }

  // 🧠 Step 4: Remove banner from the database
  await Banner.findByIdAndDelete(bannerId);
};

// 🟢 Export all banner service functions
export const BannerService = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
};
