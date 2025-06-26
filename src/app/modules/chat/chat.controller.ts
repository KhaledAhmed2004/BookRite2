import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ChatService } from './chat.service';

/**
 * @desc    Creates a new chat between users or returns the existing one
 * @route   POST /api/v1/chat
 * @access  Private
 */
const createChat = catchAsync(async (req: Request, res: Response) => {
  const { participantIds } = req.body;
  const result = await ChatService.createChat(participantIds);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Chat created or returned successfully',
    data: result,
  });
});

/**
 * @desc    Retrieves all chat sessions a user is part of
 * @route   GET /api/v1/chat/:userId
 * @access  Private
 */
const userChats = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await ChatService.getUserChats(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User chats retrieved successfully',
    data: result,
  });
});

/**
 * @desc    Finds a one-to-one chat between two users
 * @route   GET /api/v1/chat/find/:firstId/:secondId
 * @access  Private
 */
const findChat = catchAsync(async (req: Request, res: Response) => {
  const { firstId, secondId } = req.params;
  const result = await ChatService.findChatBetweenUsers(firstId, secondId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Chat found successfully',
    data: result,
  });
});

export const ChatController = {
  createChat,
  userChats,
  findChat,
};
