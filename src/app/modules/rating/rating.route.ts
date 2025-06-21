import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { RatingController } from './rating.controller';
import { RatingValidationZodSchema } from './rating.validation';

const router = express.Router();

router.post(
  '/:serviceId',
  auth(USER_ROLES.USER),
  validateRequest(RatingValidationZodSchema.giveRating),
  RatingController.createRating
);

router.patch(
  '/:serviceId',
  auth(USER_ROLES.USER),
  validateRequest(RatingValidationZodSchema.giveRating),
  RatingController.updateRating
);

router.delete(
  '/:serviceId',
  auth(USER_ROLES.USER),
  RatingController.deleteRating
);

// Optional: get all ratings for a service
router.get(
  '/service/:serviceId',
  RatingController.getRatingsForService
);

export const RatingRoutes = router;
