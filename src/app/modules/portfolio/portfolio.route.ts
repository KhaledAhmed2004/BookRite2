import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { PortfolioController } from './portfolio.controller';
import { PortfolioValidationSchema } from './portfolio.validaction';

const router = express.Router();

// Create a new portfolio
router.post(
  '/create',
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = PortfolioValidationSchema.createService.parse(
        JSON.parse(req.body.data)
      );
    }
    return PortfolioController.createPortfolio(req, res, next);
  }
);

// Get all portfolios for a specific provider
router.get('/', PortfolioController.getAllPortfolios);

// Get single portfolio by ID
router.get('/:portfolioId', PortfolioController.getSinglePortfolio);

// Update a portfolio by ID
router.patch(
  '/:portfolioId',
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = PortfolioValidationSchema.updateService.parse(
        JSON.parse(req.body.data)
      );
    }
    return PortfolioController.updatePortfolio(req, res, next);
  }
);

// Delete a portfolio by ID
router.delete(
  '/:portfolioId',
  auth(USER_ROLES.PROVIDER),
  PortfolioController.deletePortfolio
);

export const PortfolioRoutes = router;
