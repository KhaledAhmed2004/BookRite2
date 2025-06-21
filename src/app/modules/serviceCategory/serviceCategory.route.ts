import express, { Request, Response, NextFunction } from 'express';
import { ServiceCategoryController } from './serviceCategory.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { ServiceCategoryValidation } from './serviceCategory.validation';

const router = express.Router();

// Create a new service category
router.post(
  '/create',
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
router.delete('/:categoryId', ServiceCategoryController.deleteServiceCategory);

export const ServiceCategoryRoutes = router;
