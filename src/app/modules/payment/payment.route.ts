import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

// ✅ Authenticated users can create a payment intent
router.post(
  '/create-payment-intent',
  auth(USER_ROLES.USER),
  PaymentController.createPaymentIntent
);
export const PaymentRoute = router;
