import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { Banner } from './banner.model';
import { TBanner } from './banner.interface';

// Create a new banner
const createBanner = async (payload: TBanner): Promise<TBanner> => {
  const createdBanner = await Banner.create(payload);

  if (!createdBanner) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create banner');
  }

  return createdBanner;
};

// Get all banners
const getAllBanners = async (): Promise<TBanner[]> => {
  const banners = await Banner.find();

  if (!banners.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No banners found');
  }

  return banners;
};

// Get a single banner by ID
const getSingleBanner = async (id: string): Promise<TBanner> => {
  const banner = await Banner.findById(id);

  if (!banner) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Banner not found');
  }

  return banner;
};

// Update a banner by ID
const updateBanner = async (
  id: string,
  payload: Partial<TBanner>
): Promise<TBanner> => {
  const existingBanner = await Banner.findById(id);

  if (!existingBanner) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Banner not found');
  }

  // If new image provided, delete the old one
  if (payload.image_url && existingBanner.image_url) {
    unlinkFile(existingBanner.image_url);
  }

  const updatedBanner = await Banner.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updatedBanner) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update banner');
  }

  return updatedBanner;
};

// Delete a banner by ID
const deleteBanner = async (userId: string): Promise<void> => {
  const existingBanner = await Banner.findById(userId);

  if (!existingBanner) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Banner not found');
  }

  // Delete image from disk
  if (existingBanner.image_url) {
    unlinkFile(existingBanner.image_url);
  }

  await Banner.findByIdAndDelete(userId);
};

export const BannerService = {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
