import express from 'express';
import { ChatController } from './chat.controller';

const router = express.Router();

/**
 * @route   POST /
 * @desc    Create a new chat between two users
 * @access  Private
 * @body    { senderId: string, receiverId: string }
 */
router.post('/', ChatController.createChat);

/**
 * @route   GET /:userId
 * @desc    Retrieve all chats that the specified user is involved in
 * @access  Private
 * @param   userId - ID of the user
 */
router.get('/:userId', ChatController.userChats);

/**
 * @route   GET /find/:firstId/:secondId
 * @desc    Find an existing one-to-one chat between two users
 * @access  Private
 * @param   firstId  - ID of the first user
 * @param   secondId - ID of the second user
 */
router.get('/find/:firstId/:secondId', ChatController.findChat);

// Export the chat routes to be mounted in the main app
export const ChatRoutes = router;
