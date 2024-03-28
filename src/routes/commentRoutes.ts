import { Router } from 'express';
import { VerifyToken } from '../middlewares/authenticateMiddleware';
import { CreateComment, DeleteComment, UpdateComment } from '../controllers/commentController';

// Create a new router instance
const router = Router();

/**
 * Route for creating a new comment on a post.
 * @route POST /api/comments/{postId}
 * @group Comments - Operations related to comments
 * @param {string} postId.path.required - The ID of the post to comment on.
 * @param {string} message.body.required - The message content of the new comment.
 * @returns {object} 200 - Success message and the created comment.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized to create the comment
 * @access Private
 */
router.post('/comments/:postId/:userId', VerifyToken, CreateComment);

/**
 * Route for updating/editing a comment by ID.
 * @route PUT /api/comments/{commentId}
 * @group Comments - Operations related to comments
 * @param {string} commentId.path.required - The ID of the comment to update.
 * @param {string} message.body.required - The new message content of the comment.
 * @returns {object} 200 - Success message and the updated comment.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized to edit the comment.
 * @returns {Error} 404 - Error message if the comment is not found.
 * @access Private
 */
router.put('/comments/:commentId', VerifyToken, UpdateComment);

/**
 * Route for deleting a comment by ID.
 * @route DELETE /api/comments/{commentId}
 * @group Comments - Operations related to comments
 * @param {string} commentId.path.required - The ID of the comment to delete.
 * @returns {object} 204 - Success message if the comment is deleted.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized to delete the comment.
 * @returns {Error} 404 - Error message if the comment is not found.
 * @access Private
 */
router.delete('/comments/:commentId', DeleteComment);

// Export the router instance
export { router as CommentRoutes };