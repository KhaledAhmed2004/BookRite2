import express, { Request, Response, NextFunction } from 'express';
import { ServiceCategoryController } from './serviceCategory.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { ServiceCategoryValidation } from './serviceCategory.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

// Create a new service category
router.post(
  '/create',
  auth(USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = ServiceCategoryValidation.updateServiceCategoryZodSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return ServiceCategoryController.createServiceCategory(req, res, next);
  }
);

// Get all service categories
router.get('/', ServiceCategoryController.getAllServiceCategories);

// Update a service cateogry by ID
router.patch(
  '/:categoryId',
  auth(USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = ServiceCategoryValidation.updateServiceCategoryZodSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return ServiceCategoryController.updateServiceCategory(req, res, next);
  }
);

// Delete a service category by ID
router.delete(
  '/:categoryId',
  auth(USER_ROLES.SUPER_ADMIN),
  ServiceCategoryController.deleteServiceCategory
);

export const ServiceCategoryRoutes = router;
