import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { FaqService } from './faq.service';

// ✅ Create a new FAQ
const createFaq = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await FaqService.createFaq(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'FAQ created successfully',
      data: result,
    });
  }
);

// ✅ Get all FAQs
const getAllFaqs = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FaqService.getAllFaqs();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'All FAQs retrieved successfully',
      data: result,
    });
  }
);

// ✅ Get a single FAQ by ID
const getSingleFaq = catchAsync(
  async (req: Request, res: Response) => {
    const { faqId } = req.params;
    const result = await FaqService.getSingleFaq(faqId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'FAQ retrieved successfully',
      data: result,
    });
  }
);

// ✅ Update a FAQ by ID
const updateFaq = catchAsync(
  async (req: Request, res: Response) => {
    const { faqId } = req.params;
    const result = await FaqService.updateFaq(faqId, req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'FAQ updated successfully',
      data: result,
    });
  }
);

// ✅ Delete a FAQ by ID
const deleteFaq = catchAsync(
  async (req: Request, res: Response) => {
    const { faqId } = req.params;
    await FaqService.deleteFaq(faqId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'FAQ deleted successfully',
      data: null,
    });
  }
);

// ✅ Export all FAQ handlers
export const FaqController = {
  createFaq,
  getAllFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
