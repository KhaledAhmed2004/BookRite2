import express from 'express';
import { NotificationController } from './notification.controller';

const router = express.Router();

/**
 * @route   POST /
 * @desc    Create and send a new notification
 * @access  Private
 * @body    { senderId, receiverId, type, text } - Notification payload
 */
router.post('/', NotificationController.createNotification);

/**
 * @route   GET /:receiverId
 * @desc    Fetch all notifications for a given user
 * @access  Private
 * @param   receiverId - ID of the user whose notifications will be fetched
 */
router.get('/:receiverId', NotificationController.getNotifications);

/**
 * @route   PATCH /:notificationId/read
 * @desc    Mark a specific notification as read
 * @access  Private
 */
router.patch('/:notificationId/read', NotificationController.markAsRead);

export const NotificationRoutes = router;
