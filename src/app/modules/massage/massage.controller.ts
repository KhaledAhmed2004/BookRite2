import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { MessageService } from './massage.service';

// ✅ Create a new message
const createMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await MessageService.createMessage(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Message created successfully',
      data: result,
    });
  }
);

// ✅ Get all messages for a specific chat
const getMessages = catchAsync(async (req: Request, res: Response) => {
  const { chatId } = req?.params;

  const result = await MessageService.getMessagesByChatId(chatId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Messages retrieved successfully',
    data: result,
  });
});

export const MessageController = {
  createMessage,
  getMessages,
};
