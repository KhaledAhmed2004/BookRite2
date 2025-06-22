import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ServiceValidationSchema } from './service.validaction';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { ServiceController } from './service.controller';

const router = express.Router();

// Service Provider Routes
// Create a new service
router.post(
  '/create',
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = ServiceValidationSchema.createService.parse(
        JSON.parse(req.body.data)
      );
    }
    return ServiceController.createService(req, res, next);
  }
);

// Public Routes
// Get all services
router.get('/', ServiceController.getAllServices);

// Get single service by ID
router.get('/:serviceId', ServiceController.getAllServices);

// Update a service by ID
router.patch(
  '/:serviceId',
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = ServiceValidationSchema.updateService.parse(
        JSON.parse(req.body.data)
      );
    }
    return ServiceController.updateService(req, res, next);
  }
);

// Delete a service by ID
router.delete(
  '/:serviceId',
  auth(USER_ROLES.PROVIDER),
  ServiceController.deleteService
);

// Admin Routes
// Mark or unmark a service as trending
router.patch(
  '/:serviceId/mark-trending',
  auth(USER_ROLES.ADMIN),
  ServiceController.markAsTrending
);

// Mark or unmark a service as recommended
router.patch(
  '/:serviceId/mark-recommended',
  auth(USER_ROLES.ADMIN),
  ServiceController.markAsRecommended
);

export const ServiceRoutes = router;
