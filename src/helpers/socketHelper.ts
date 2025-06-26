import { Server } from 'socket.io';
import { Message } from '../app/modules/massage/message.model';
import { Notification } from '../app/modules/notification/notification.model';

const socket = (io: Server) => {
  io.on('connection', socket => {
    console.log('A user connected');
    // Handle joining a chat room
    socket.on('joinChat', chatId => {
      console.log('chatId', chatId);
      socket.join(chatId);
    });

    // ✅ Notification
    socket.on(
      'sendNotification',
      async ({ receiverId, senderId, type, text }) => {
        // 1. Save to database
        const newNotification = new Notification({
          senderId,
          receiverId,
          type,
          text,
        });
        await newNotification.save();

        // 2. Emit real-time to receiver
        io.to(receiverId).emit('getNotification', {
          senderId,
          type,
          text,
          timestamp: newNotification.createdAt,
        });
      }
    );

    // ✅ Handle notification creation
    socket.on(
      'sendNotification',
      async ({ receiverId, senderId, type, text }) => {
        // 1. Save notification in DB
        const newNotification = await Notification.create({
          senderId,
          receiverId,
          type,
          text,
        });

        // 2. Emit to receiver in real-time
        io.to(receiverId).emit('getNotification', {
          senderId,
          type,
          text,
          timestamp: newNotification.createdAt,
        });
      }
    );

    // ✅ Handle message sending + create notification
    socket.on('sendMessage', async messageData => {
      const { chatId, senderId, text, receiverId } = messageData;

      // 1. Save message to DB
      const newMessage = await Message.create({ chatId, senderId, text });

      // 2. Save notification in DB
      const notification = await Notification.create({
        senderId,
        receiverId,
        type: 'message',
        text: 'You have a new message',
      });

      // 3. Emit notification to receiver
      io.to(receiverId).emit('getNotification', notification);

      // 4. Emit new message to chat room
      io.to(chatId).emit('receiveMessage', newMessage);
    });

    //disconnect socket
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

export const SocketHelper = { socket };
