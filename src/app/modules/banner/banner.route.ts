import express, { Request, Response, NextFunction } from 'express';
import { BannerController } from './banner.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { BannerValidation } from './banner.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

// Create a new banner
router.post(
  '/',
  auth(USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req?.body?.data) {
        req.body = BannerValidation.createBannerZodSchema.parse(
          JSON.parse(req?.body?.data)
        );
      }
      return BannerController.createBanner(req, res, next);
    } catch (error) {
      return next(error);
    }
  }
);

// Get all banners
router.get('/', BannerController.getAllBanners);

//  Update a banner by ID
router.patch(
  '/:bannerId',
  auth(USER_ROLES.SUPER_ADMIN),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req?.body?.data) {
        req.body = BannerValidation.createBannerZodSchema.parse(
          JSON.parse(req?.body?.data)
        );
      }
      return BannerController.updateBanner(req, res, next);
    } catch (error) {
      return next(error);
    }
  }
);

// Delete a banner by ID
router.delete(
  '/:bannerId',
  auth(USER_ROLES.SUPER_ADMIN),
  BannerController.deleteBanner
);

export const BannerRoutes = router;
