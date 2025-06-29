import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

// 🟢 Verify user's email
const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  // 🧠 Step 1: Extract email verification data from request body
  const { ...verifyData } = req.body;

  // 🧠 Step 2: Call service to verify and update email status in DB
  const result = await AuthService.verifyEmailToDB(verifyData);

  // 🧠 Step 3: Send response back to client
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: result.message,
    data: result.data,
  });
});

// 🟢 Log in user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  // 🧠 Step 1: Extract login credentials from request body
  const { ...loginData } = req.body;

  // 🧠 Step 2: Call service to authenticate and generate token
  const result = await AuthService.loginUserFromDB(loginData);

  // 🧠 Step 3: Send token as response
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully.',
    data: result.createToken,
  });
});

// 🟢 Forgot password request
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  // 🧠 Step 1: Extract email from request body
  const email = req.body.email;

  // 🧠 Step 2: Call service to generate OTP and send via email
  const result = await AuthService.forgetPasswordToDB(email);

  // 🧠 Step 3: Send instruction message to client
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message:
      'Please check your email. We have sent you a one-time passcode (OTP).',
    data: result,
  });
});

// 🟢 Reset password using token
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  // 🧠 Step 1: Extract reset token from authorization header
  const token = req.headers.authorization;

  // 🧠 Step 2: Extract new password data from request body
  const { ...resetData } = req.body;

  // 🧠 Step 3: Call service to reset the password in DB
  const result = await AuthService.resetPasswordToDB(token!, resetData);

  // 🧠 Step 4: Send confirmation message
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Your password has been successfully reset.',
    data: result,
  });
});

// 🟢 Change current password
const changePassword = catchAsync(async (req: Request, res: Response) => {
  // 🧠 Step 1: Get the authenticated user info from req.user
  const user = req.user;

  // 🧠 Step 2: Extract old and new password from request body
  const { ...passwordData } = req.body;

  // 🧠 Step 3: Call service to change the password
  await AuthService.changePasswordToDB(user, passwordData);

  // 🧠 Step 4: Send success response
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Your password has been successfully changed',
  });
});

// 🟢 Export all auth controller functions
export const AuthController = {
  verifyEmail,
  loginUser,
  forgetPassword,
  resetPassword,
  changePassword,
};
