import express from 'express';
import { MessageController } from './massage.controller';

const router = express.Router();

/**
 * @route   POST /
 * @desc    Create and send a new message
 * @access  Private
 * @body    { senderId, chatId, content } - Message payload
 */
router.post('/', MessageController.createMessage);

/**
 * @route   GET /:chatId
 * @desc    Fetch all messages for a given chat conversation
 * @access  Private (assumes middleware handles auth elsewhere)
 * @param   chatId - ID of the chat whose messages should be fetched
 */
router.get('/:chatId', MessageController.getMessages);

export const MessageRoutes = router;
