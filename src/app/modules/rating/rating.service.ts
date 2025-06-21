import { RatingModel } from '../rating/rating.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { ServiceModel } from '../service/service.model';

// 1. Create or update a rating for a service by a user
const createRating = async (
  serviceId: string,
  userId: string,
  ratingValue: number,
  comment?: string
) => {
  // 1️⃣ Check if the service exists
  const service = await ServiceModel.findById(serviceId);
  if (!service) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  // 2️⃣ Check if user already rated this service
  const existingRating = await RatingModel.findOne({
    service: serviceId,
    user: userId,
  });

  if (existingRating) {
    // 3️⃣ Update existing rating and comment if provided
    existingRating.rating = ratingValue;
    if (comment) existingRating.comment = comment;
    await existingRating.save();
  } else {
    // 4️⃣ Create new rating
    await RatingModel.create({
      service: serviceId,
      user: userId,
      rating: ratingValue,
      comment,
    });
  }

  // 5️⃣ Get all ratings for this service
  const allRatings = await RatingModel.find({ service: serviceId });

  // 6️⃣ Calculate average rating
  const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = totalRating / allRatings.length;

  // 7️⃣ Update service with average rating and total rating count
  service.averageRating = parseFloat(avgRating.toFixed(2));
  service.totalRating = allRatings.length;
  await service.save();

  // 8️⃣ Return updated service
  return service;
};

// 2. Update an existing rating for a service by a user
const updateRating = async (
  serviceId: string,
  userId: string,
  ratingValue: number,
  comment?: string
) => {
  // 1️⃣ Check if the service exists
  const service = await ServiceModel.findById(serviceId);
  if (!service) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  // 2️⃣ Find existing rating by user for the service
  const existingRating = await RatingModel.findOne({
    service: serviceId,
    user: userId,
  });

  if (!existingRating) {
    // 3️⃣ If no rating found, throw error
    throw new ApiError(StatusCodes.NOT_FOUND, 'Rating not found for this user');
  }

  // 4️⃣ Update rating and comment if provided
  existingRating.rating = ratingValue;
  if (comment) existingRating.comment = comment;
  await existingRating.save();

  // 5️⃣ Get all ratings for this service to recalculate average
  const allRatings = await RatingModel.find({ service: serviceId });

  // 6️⃣ Calculate new average rating
  const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = totalRating / allRatings.length;

  // 7️⃣ Update service with new average and total rating count
  service.averageRating = parseFloat(avgRating.toFixed(2));
  service.totalRating = allRatings.length;
  await service.save();

  // 8️⃣ Return updated service
  return service;
};

// 3. Delete a user's rating for a service
const deleteRating = async (serviceId: string, userId: string) => {
  // 1️⃣ Check if service exists
  const service = await ServiceModel.findById(serviceId);
  if (!service) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  // 2️⃣ Find and delete rating by user for the service
  const deletedRating = await RatingModel.findOneAndDelete({
    service: serviceId,
    user: userId,
  });

  if (!deletedRating) {
    // 3️⃣ If no rating found to delete, throw error
    throw new ApiError(StatusCodes.NOT_FOUND, 'Rating not found for this user');
  }

  // 4️⃣ Get all remaining ratings for this service
  const allRatings = await RatingModel.find({ service: serviceId });

  if (allRatings.length > 0) {
    // 5️⃣ Calculate new average rating
    const totalRating = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / allRatings.length;

    // 6️⃣ Update service with new average and rating count
    service.averageRating = parseFloat(avgRating.toFixed(2));
    service.totalRating = allRatings.length;
  } else {
    // 7️⃣ If no ratings left, reset average and count
    service.averageRating = 0;
    service.totalRating = 0;
  }
  await service.save();

  // 8️⃣ Return updated service
  return service;
};

// 4. Get all ratings for a specific service
const getRatingsForService = async (serviceId: string) => {
  // 1️⃣ Check if service exists
  const service = await ServiceModel.findById(serviceId);
  if (!service) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Service not found');
  }

  // 2️⃣ Find all ratings related to this service
  const ratings = await RatingModel.find({ service: serviceId }).populate(
    'user',
    'name email'
  );

  // 3️⃣ Return list of ratings
  return ratings;
};

export const RatingService = {
  createRating,
  updateRating,
  deleteRating,
  getRatingsForService,
};
 