import { Chat } from './chat.model';

/**
 * @desc    Creates a new chat if it doesn't already exist between given participants
 * @param   participantIds - An array of user IDs involved in the chat
 * @returns The existing or newly created chat document
 */
const createChat = async (participantIds: string[]) => {
  // ✅ Step 1: Search for an existing chat with exactly these participants
  let chat = await Chat.findOne({
    participants: { $all: [...participantIds] },
  });

  // ✅ Step 2: If no such chat exists, create a new chat document
  if (!chat) {
    chat = await Chat.create({ participants: participantIds });
  }

  // ✅ Step 3: Return the existing or newly created chat
  return chat;
};

/**
 * @desc    Retrieves all chats a user is involved in
 * @param   userId - ID of the user
 * @returns Array of chat documents the user is participating in
 */
const getUserChats = async (userId: string) => {
  // ✅ Step 1: Find all chats where the user ID is included in the participants list
  const chats = await Chat.find({
    participants: { $in: [userId] },
  }).populate('participants'); // ✅ Optionally populate user details for frontend display

  // ✅ Step 2: Return the list of user-related chats
  return chats;
};

/**
 * @desc    Finds a one-to-one chat between two specific users
 * @param   firstId - ID of the first user
 * @param   secondId - ID of the second user
 * @returns A single chat document if found, or null
 */
const findChatBetweenUsers = async (firstId: string, secondId: string) => {
  // ✅ Step 1: Search for a chat that includes both users
  const chat = await Chat.findOne({
    participants: { $all: [firstId, secondId] },
  });

  // ✅ Step 2: Return the found chat document (or null if not found)
  return chat;
};

export const ChatService = {
  createChat,
  getUserChats,
  findChatBetweenUsers,
};
