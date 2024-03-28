import { Router } from 'express';
import { CreatePost, DeletePost, GetAPost, GetAllPosts, UpdatePost } from '../controllers/postControllers';
import { VerifyToken } from '../middlewares/authenticateMiddleware';

// Create a new router instance
const router = Router();

/**
 * Route for retrieving all posts.
 * @route GET /api/posts
 * @group Posts - Operations related to posts
 * @returns {object} 200 - An array of all posts.
 * @returns {Error} 404 - Error message if no posts are found.
 * @access Public
 */
router.get('/posts', GetAllPosts);

/**
 * Route for retrieving a single post by ID.
 * @route GET /api/posts/{postId}
 * @group Posts - Operations related to posts
 * @param {string} postId.path.required - The ID of the post to retrieve.
 * @returns {object} 200 - The requested post.
 * @returns {Error} 404 - Error message if the post is not found.
 * @access Public
 */
router.get('/posts/:postId', GetAPost);

/**
 * Route for creating a new post.
 * @route POST /api/posts
 * @group Posts - Operations related to posts
 * @param {string} title.body.required - The title of the new post.
 * @param {string} body.body.required - The body of the new post.
 * @param {string[]} tags.body.required - The tags of the new post.
 * @returns {object} 200 - Success message and the created post.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized.
 * @returns {Error} 404 - Error message if the post not found.
 * @access Private
 */
router.post('/posts', VerifyToken, CreatePost);

/**
 * Route for updating/editing a post by ID.
 * @route PUT /api/posts/{postId}
 * @group Posts - Operations related to posts
 * @param {string} postId.path.required - The ID of the post to update.
 * @param {string} title.body.required - The new title of the post.
 * @param {string} body.body.required - The new body of the post.
 * @param {string[]} tags.body - The new tags of the post.
 * @returns {object} 200 - Success message and the updated post.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized to edit the post.
 * @returns {Error} 404 - Error message if the post is not found.
 * @access Private
 */
router.put('/posts/:postId', VerifyToken, UpdatePost);

/**
 * Route for deleting a post by ID.
 * @route DELETE /api/posts/{postId}
 * @group Posts - Operations related to posts
 * @param {string} postId.path.required - The ID of the post to delete.
 * @returns {object} 204 - Success message if the post is deleted.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized to delete the post.
 * @returns {Error} 404 - Error message if the post is not found.
 * @access Private
 */
router.delete('/posts/:postId', VerifyToken, DeletePost);

// Export the router instance
export { router as PostRoutes };