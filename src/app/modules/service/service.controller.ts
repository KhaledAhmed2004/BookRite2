import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.service';
import { getSingleFilePath } from '../../../shared/getFilePath';

// Create a new service
const createService = catchAsync(async (req: Request, res: Response) => {
  console.log('from controller service');
  let img = getSingleFilePath(req.files, 'image');
  const data = {
    img,
    ...req.body,
  };
  const result = await ServiceService.createService(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

// Get all services
const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const services = await ServiceService.getAllServices(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: services,
  });
});

// Get a single service by ID
const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const service = await ServiceService.getServiceById(serviceId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: service,
  });
});

// Update a service by ID

const updateService = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { serviceId } = req.params;
    let img = getSingleFilePath(req?.files, 'image');

    const updatedData = {
      img,
      ...req.body,
    };
    const result = await ServiceService.updateService(serviceId, updatedData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Updated Service successfully',
      data: result,
    });
  }
);

const giveRating = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const { rating } = req.body;

  const result = await ServiceService.giveRating(serviceId, rating);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Rating submitted successfully',
    data: result,
  });
});


// Delete a service by ID
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  await ServiceService.deleteService(serviceId);
  sendResponse(res, {
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: 'Service deleted successfully',
    data: null,
  });
});

// Mark or unmark a service as trending
const markAsTrending = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ServiceService.toggleTrending(serviceId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Trending status updated successfully',
    data: result,
  });
});

// Mark or unmark a service as recommended
const markAsRecommended = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ServiceService.toggleRecommended(serviceId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Recommended status updated successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
  updateService,
  deleteService,
  getAllServices,
  getServiceById,
  markAsTrending,
  markAsRecommended,
  giveRating,
};
