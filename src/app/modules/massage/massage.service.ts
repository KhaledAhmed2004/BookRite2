import { Message } from './message.model';

/**
 * @desc    Creates a new chat message in the database
 * @param   payload - Object containing senderId, chatId, and message content
 * @returns The created message document
 */
const createMessage = async (payload: {
  senderId: string;
  chatId: string;
  content: string;
}) => {
  const message = await Message.create(payload);
  return message;
};

/**
 * @desc    Retrieves all messages for a given chat ID
 * @param   chatId - The ID of the chat to fetch messages for
 * @returns An array of messages belonging to the chat
 */
const getMessagesByChatId = async (chatId: string) => {
  // const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
  const messages = await Message.find({ chatId });
  return messages;
};

export const MessageService = {
  createMessage,
  getMessagesByChatId,
};
