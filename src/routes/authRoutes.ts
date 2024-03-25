import { Router } from 'express';
import { LoginUser, RegisterUser } from '../controllers/authControllers';

// Create a new router instance
const router = Router();

/**
 * Route for registering a new user.
 * @route POST /api/auth/register
 * @group Authentication - Operations related to user authentication
 * @param {string} username.body.required - The username of the user to register.
 * @param {string} password.body.required - The password of the user to register.
 * @returns {object} 200 - Success message and user data.
 * @returns {Error} 400 - Error message if registration fails.
 */
router.post('/auth/register', RegisterUser);

/**
 * Route for user login.
 * @route POST /api/auth/login
 * @group Authentication - Operations related to user authentication
 * @param {string} username.body.required - The username of the user to login.
 * @param {string} password.body.required - The password of the user to login.
 * @returns {object} 200 - Token and user data upon successful login.
 * @returns {Error} 400 - Error message if login fails.
 */
router.post('/auth/register', LoginUser);

// Export the router instance
export { router as AuthRoutes }