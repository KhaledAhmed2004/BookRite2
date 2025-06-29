import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthZodValidationSchema } from './auth.validation';

const router = express.Router();

// Login user
router.post(
  '/login',
  validateRequest(AuthZodValidationSchema.Login),
  AuthController.loginUser
);

// Send password reset instructions to user's email
router.post(
  '/forget-password',
  validateRequest(AuthZodValidationSchema.ForgetPassword),
  AuthController.forgetPassword
);

// Verify user's email using verification code
router.post(
  '/verify-email',
  validateRequest(AuthZodValidationSchema.VerifyEmail),
  AuthController.verifyEmail
);

// Reset user's password after verification
router.post(
  '/reset-password',
  validateRequest(AuthZodValidationSchema.ResetPassword),
  AuthController.resetPassword
);

// Change current password for logged-in user
router.post(
  '/change-password',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  validateRequest(AuthZodValidationSchema.ChangePassword),
  AuthController.changePassword
);

export const AuthRoutes = router;
