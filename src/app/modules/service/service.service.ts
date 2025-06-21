import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { TService } from './service.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { ServiceModel } from './service.model';

// Create a new service
const createService = async (payload: TService) => {
  console.log('hello');
  const created = await ServiceModel.create(payload);

  if (!created) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create service');
  }

  return created;
};

// Get all services
const getAllServices = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(ServiceModel.find(), query)
    .search(['name', 'description']) // adjust searchable fields as per your schema
    .filter()
    .sort()
    .paginate()
    .fields();

  const services = await serviceQuery.modelQuery.exec();

  if (!services.length) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No services found');
  }

  return services;
};

// Get a single service by ID
const getServiceById = async (serviceId: string) => {
  const service = await ServiceModel.findById(serviceId);

  if (!service) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  return service;
};

// Update a service by ID
const updateService = async (serviceId: string, payload: Partial<TService>) => {
  const existing = await ServiceModel.findById(serviceId);

  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  // If your service has an image and you want to delete old image when updating,
  // you can implement unlink logic here similar to service category

  const updated = await ServiceModel.findByIdAndUpdate(serviceId, payload, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to update service');
  }

  return updated;
};

// Delete a service by ID
const deleteService = async (serviceId: string) => {
  const existing = await ServiceModel.findById(serviceId);

  if (!existing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  await ServiceModel.findByIdAndDelete(serviceId);
};

// Toggle trending status
const toggleTrending = async (serviceId: string) => {
  const service = await ServiceModel.findById(serviceId);

  if (!service) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  service.is_trending = !service.is_trending;
  return service.save();
};

// Toggle recommended status
const toggleRecommended = async (serviceId: string) => {
  const service = await ServiceModel.findById(serviceId);

  if (!service) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  service.is_recommended = !service.is_recommended;
  return service.save();
};

export const ServiceService = {
  createService,
  updateService,
  deleteService,
  getAllServices,
  getServiceById,
  toggleTrending,
  toggleRecommended,
};
