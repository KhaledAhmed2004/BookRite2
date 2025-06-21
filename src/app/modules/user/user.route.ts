import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

// Create user
router.post(
  '/',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

// get user profile
router.get(
  '/profile',
  auth(USER_ROLES.ADMIN, USER_ROLES.USER),
  UserController.getUserProfile
);

// update user profile
router.patch(
  '/profile',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = UserValidation.updateUserZodSchema.parse(
        JSON.parse(req.body.data)
      );
    }
    return UserController.updateProfile(req, res, next);
  }
);

// delete user
router.delete(
  '/:userId',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  UserController.deleteUser
);



export const UserRoutes = router;
