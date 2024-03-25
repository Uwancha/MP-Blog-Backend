import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middlewares/authenticateMiddleware";
import { User } from "../models/userModel";
import { uploadAvatarToCloudinary } from "../middlewares/uploadAvatar";
import { Post } from "../models/postModel";

/**
 * Gets a user profile.
 * @param { CustomRequest } req - The request object containing the user's biography.
 * @param { Response } res - The response object to send back to the client.
 * @param { NextFunction } next - The next middleware function in the stack.
 * @returns { Promise<Response> } A JSON response with user profile data or failure message.
 */
export const GetUserProfile = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;

        // Ensure that the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'No user found'});
        };

        // Get posts where the user is an author
        const userposts = await Post.find({ author: userId });

        return res.status(200).json({data: { user, userposts}});
    } catch (error) {
        next(error);
    };
};

/**
 * Update user's biography.
 * @param { CustomRequest } req - The request object containing the user's biography.
 * @param { Response } res - The response object to send back to the client.
 * @param { NextFunction } next - The next middleware function in the stack.
 * @returns { Promise<Response> } A JSON response indicating the success or failure of the user bio update.
 */
export const UpdateUserBio = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Extract user information and user ID from the request
        const { bio } = req.body;
        const userId = req.params.userId;

        // Ensure that the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'No user found'})
        };

        // Update user's biography
        const updatedProfile = await User.findByIdAndUpdate(userId, { profile: { bio } }, { new: true });

        // Return success message with the updated user profile
        return res.status(200).json({message: 'Profile updated successfully', data: updatedProfile});
    } catch (error) {
        return next(error);
    };
};

/**
 * Update user's avatar.
 * @param { CustomRequest } req - The request object containing the user's avatar.
 * @param { Response } res - The response object to send back to the client.
 * @param { NextFunction } next - The next middleware function in the stack.
 * @returns { Promise<Response> } A JSON response indicating the success or failure of the user avatar update.
 */
export const UpdateUserAvatar = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Extract user information and user ID from the request
        const { avatar } = req.body;
        const userId = req.params.userId;

        // Ensure that the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'No user found'})
        };
        
        // Upload avatar to cloudinary
        const result = await uploadAvatarToCloudinary(avatar);

        // Update user's avatar URL
        const updatedProfile = await User.findByIdAndUpdate(userId, { profile: { avatar: result.secure_url } }, { new: true });

        // Return success message with the updated user profile
        return res.status(200).json({message: 'Profile updated successfully', data: updatedProfile});
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};