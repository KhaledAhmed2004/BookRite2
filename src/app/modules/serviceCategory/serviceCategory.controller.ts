import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ServiceCategoryService } from './serviceCategory.service';

// Create a new service category
const createServiceCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('saervice caterry hit contoler');
    const img = getSingleFilePath(req.files, 'image');
    console.log(req.files); // check if image exists
    console.log(img); // check final path

    const data = {
      img,
      ...req.body,
    };

    const result = await ServiceCategoryService.createServiceCategory(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Service category created successfully',
      data: result,
    });
  }
);

// Get all service categories
const getAllServiceCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ServiceCategoryService.getAllServiceCategories();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'All service categories retrieved successfully',
      data: result,
    });
  }
);

// Get a single service category by ID
const getSingleServiceCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceCategoryService.getSingleServiceCategory(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Single service category retrieved successfully',
      data: result,
    });
  }
);

// Update a service category by ID
const updateServiceCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    const img = getSingleFilePath(req.files, 'image');

    const data = {
      img,
      ...req.body,
    };

    const result = await ServiceCategoryService.updateServiceCategory(
      categoryId,
      data
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Service category updated successfully',
      data: result,
    });
  }
);

// Delete a service category by ID
const deleteServiceCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    await ServiceCategoryService.deleteServiceCategory(categoryId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Service category deleted successfully',
      data: null,
    });
  }
);

export const ServiceCategoryController = {
  createServiceCategory,
  getAllServiceCategories,
  getSingleServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
};
