import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { PaymentService } from './payment.service';

// ✅ Create Payment Intent Controller
const createPaymentIntent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { price } = req.body;
    const paymentIntent = await PaymentService.createPaymentIntentToDB(price);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Payment intent created successfully',
      data: paymentIntent,
    });
  }
);

export const PaymentController = {
  createPaymentIntent,
};
