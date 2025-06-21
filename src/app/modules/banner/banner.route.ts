import express, { Request, Response, NextFunction } from 'express';
import { BannerController } from './banner.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { BannerValidation } from './banner.validation';
const router = express.Router();

// Create a new banner
router.post(
  '/create',
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = BannerValidation.createBannerZodSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return BannerController.createBanner(req, res, next);
  }
);

// Get all banners
router.get('/', BannerController.getAllBanners);

// Update a banner by ID
router.patch('/:bannerId', BannerController.updateBanner);

// Delete a banner by ID
router.delete('/:bannerId', BannerController.deleteBanner);

export const BannerRoutes = router;
