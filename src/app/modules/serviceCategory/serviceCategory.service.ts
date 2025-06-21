import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { ServiceCategoryModel } from './serviceCategory.model';
import { IServiceCategory } from './serviceCategory.interfacet';

// Create a new service category
const createServiceCategory = async (
  payload: IServiceCategory
): Promise<IServiceCategory> => {
  const created = await ServiceCategoryModel.create(payload);

  if (!created) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to create service category'
    );
  }

  return created;
};

// Get all service categories
const getAllServiceCategories = async (): Promise<IServiceCategory[]> => {
  const categories = await ServiceCategoryModel.find();

  if (!categories.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No service categories found');
  }

  return categories;
};

// Get a single service category by ID
const getSingleServiceCategory = async (
  id: string
): Promise<IServiceCategory> => {
  const category = await ServiceCategoryModel.findById(id);

  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service category not found');
  }

  return category;
};

// Update a service category by ID
const updateServiceCategory = async (
  categoryId: string,
  payload: Partial<IServiceCategory>
): Promise<IServiceCategory> => {
  const existing = await ServiceCategoryModel.findById(categoryId);

  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service category not found');
  }

  // Delete old image if new one is uploaded
  if (payload.img && existing.img) {
    unlinkFile(existing.img);
  }

  const updated = await ServiceCategoryModel.findByIdAndUpdate(categoryId, payload, {
    new: true,
  });

  if (!updated) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Failed to update service category'
    );
  }

  return updated;
};

// Delete a service category by ID
const deleteServiceCategory = async (categoryId: string): Promise<void> => {
  const existing = await ServiceCategoryModel.findById(categoryId);
  console.log(existing);

  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service category not found');
  }

  // Delete image from disk if exists
  if (existing.img) {
    unlinkFile(existing.img);
  }

  await ServiceCategoryModel.findByIdAndDelete(categoryId);
};

export const ServiceCategoryService = {
  createServiceCategory,
  getAllServiceCategories,
  getSingleServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};
