import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { BookmarkController } from './bookmark.controller';

const router = express.Router();

// Create a bookmark
router.post('/:id', auth(USER_ROLES.USER), BookmarkController.createBookmark);

// Get all bookmarks
router.get('/', auth(USER_ROLES.USER), BookmarkController.getAllBookmarks);

// Delete bookmark by ID
router.delete('/:id', auth(USER_ROLES.USER), BookmarkController.deleteBookmark);

export const BookmarkRoutes = router;
