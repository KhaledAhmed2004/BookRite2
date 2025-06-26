import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { NotificationService } from './notification.service';

// ✅ Create a new notification
const createNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await NotificationService.createNotification(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Notification created successfully',
      data: result,
    });
  }
);

// ✅ Get all notifications for a specific user (receiverId)
const getNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { receiverId } = req.params;

    const result = await NotificationService.getNotificationsByReceiverId(receiverId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Notifications retrieved successfully',
      data: result,
    });
  }
);

// ✅ Mark a notification as read
const markAsRead = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { notificationId } = req.params;

    const result = await NotificationService.markNotificationAsRead(notificationId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Notification marked as read',
      data: result,
    });
  }
);

export const NotificationController = {
  createNotification,
  getNotifications,
  markAsRead,
};
