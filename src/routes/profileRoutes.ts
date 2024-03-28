import { Router } from 'express';
import { VerifyToken } from '../middlewares/authenticateMiddleware';
import { GetUserProfile, UpdateUserAvatar, UpdateUserBio } from '../controllers/profileControllers';

const router = Router();

/**
 * Route for retrieving user profile information by user ID.
 * @route GET /profile/{userId}
 * @group Profile - Operations related to user profiles
 * @param {string} userId.path.required - The ID of the user whose profile information to retrieve.
 * @returns {object} 200 - User profile data.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized.
 * @returns {Error} 404 - Error message if the user is not found.
 * @access Private
 */
router.get('/profile', VerifyToken, GetUserProfile);

/**
 * Route for updating user biography by user ID.
 * @route PUT /api/profile/about/{userId}
 * @group Profile - Operations related to user profiles
 * @param {string} userId.path.required - The ID of the user whose biography to update.
 * @param {string} bio.body.required - The new biography content.
 * @returns {object} 200 - Success message and the updated user profile.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized to update the profile.
 * @returns {Error} 404 - Error message if the user is not found.
 * @access Private
 */
router.put('/profile/bio', VerifyToken, UpdateUserBio);

/**
 * Route for updating user avatar by user ID.
 * @route PUT /api/profile/avatar/{userId}
 * @group Profile - Operations related to user profiles
 * @param {string} userId.path.required - The ID of the user whose avatar to update.
 * @param {string} avatar.body.required - The new avatar file path.
 * @returns {object} 200 - Success message and the updated user profile with new avatar.
 * @returns {Error} 401 - Error message if the user is not authenticated.
 * @returns {Error} 403 - Error message if the user is not authorized to update the profile.
 * @returns {Error} 404 - Error message if the user is not found.
 * @access Private
 */
router.put('/profile/avatar', VerifyToken, UpdateUserAvatar);

export { router as ProfileRoutes };