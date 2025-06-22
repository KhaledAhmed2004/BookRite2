import express from 'express';
import { FaqController } from './faq.controller';
import { FaqValidationZodSchema } from './faq.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

// ✅ Public - Get all FAQs
router.get('/', FaqController.getAllFaqs);

// ✅ Public - Get a single FAQ by ID
router.get('/:faqId', FaqController.getSingleFaq);

// ✅ Admin - Create a new FAQ
router.post(
  '/',
  auth(USER_ROLES.SUPER_ADMIN),
  validateRequest(FaqValidationZodSchema.createFaq),
  FaqController.createFaq
);

// ✅ Admin - Update an FAQ by ID
router.patch(
  '/:faqId',
  validateRequest(FaqValidationZodSchema.updateFaq),
  FaqController.updateFaq
);

// ✅ Admin - Delete an FAQ by ID
router.delete('/:faqId', FaqController.deleteFaq);

export const FaqRoutes = router;
