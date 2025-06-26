import { Notification } from './notification.model';

export const NotificationService = {
  /**
   * @desc Creates a new notification document in the database
   * @param payload - Object containing senderId, receiverId, type, and optional text
   * @returns The created notification document
   */
  createNotification: async (payload: {
    senderId: string;
    receiverId: string;
    type: string;
    text?: string;
  }) => {
    // Step 1: Receive notification data (senderId, receiverId, type, text)
    // Step 2: Use Mongoose `.create()` method to save data in 'notifications' collection
    const notification = await Notification.create(payload);
    // Step 3: Return the saved notification object
    return notification;
  },

  /**
   * @desc Retrieves all notifications for a given receiverId from database
   * @param receiverId - User ID to fetch notifications for
   * @returns Array of notifications sorted by newest first
   */
  getNotificationsByReceiverId: async (receiverId: string) => {
    // Step 1: Accept receiverId as parameter
    // Step 2: Query the notifications collection with `receiverId` filter
    // Step 3: Sort notifications by createdAt descending (newest first)
    const notifications = await Notification.find({ receiverId }).sort({
      createdAt: -1,
    });
    // Step 4: Return the array of notifications
    return notifications;
  },

  /**
   * @desc Marks a specific notification as read (updates isRead to true)
   * @param notificationId - The ID of the notification to update
   * @returns The updated notification document or null if not found
   */
  markNotificationAsRead: async (notificationId: string) => {
    // Step 1: Receive notificationId as parameter
    // Step 2: Use Mongoose `findByIdAndUpdate` to set isRead: true
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true } // return the updated document
    );
    // Step 3: Return the updated notification document
    return updatedNotification;
  },
};
