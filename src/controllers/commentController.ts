import { NextFunction, Request, Response } from "express";
import { Post } from "../models/postModel";
import { Comment } from "../models/commentModel";
import { CustomRequest } from "../middlewares/authenticateMiddleware";

/**
 * Create a comment for a given post.
 * @param { Request } req - The request object containing the comment information.
 * @param { Response } res - The response object to send back to the client.
 * @param { NextFunction } next - The next middleware function in the stack.
 * @returns { Promise<Response> } A JSON response indicating the success or failure of the comment creation.
 */
export const CreateComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Extract comment information, postID, and author ID from the request
        const { message } = req.body;
        const postId = req.params.postId;
        const userId = typeof req.user === 'string' ? undefined : req.user?.userId;


        // Ensure post exists to put the comment
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(422).json({message: "Post not found"});
        };

        // Create comment 
        const newComment = await Comment.create({
            message,
            author: userId
        });

        // Push new comment's ID to comments array in the post and save the post
        post.comments?.push(newComment._id);
        await post.save();
        
        // Return new created comment along with a success message
        return res.status(200).json({message: "Comment created successfully", data: newComment});
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};

/**
 * Update a comment.
 * @param { Request } req - The request object containing the updated comment information.
 * @param { Response } res - The response object to send back to the client.
 * @param { NextFunction } next - The next middleware function in the stack.
 * @returns { Promise<Response> } A JSON response indicating the success or failure of the comment update.
 */
export const UpdateComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Extract comment information, postID  and author ID from the request
        const message = req.body.text;
        const commentId = req.params.commentId;
        // Extract userId from request object
        const userId = typeof req.user === 'string' ? undefined : req.user?.userId;


        // Ensure that comment exists to update
        const commentExists = await Comment.findById(commentId);
        if (!commentExists) {
            return res.status(404).json({message: "No comment to update"});
        };

        // Ensure the user is the owner of the post
        if (commentExists?.author.toString() !== userId?.toString()) {
            return res.status(403).json({ message: 'Unauthorized request. Only authors can edit their comments' });
        };

        // Update the comment
        const UpdatedComment = await Comment.findByIdAndUpdate(commentId, { message: message }, { new: true });

        // Return updated comment along with a success message
        return res.status(200).json({ message: "Comment updated successfully", data: UpdatedComment });
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};

/**
 * Delete a comment.
 * @param { Request } req - The request object containing the ID of the comment to be deleted.
 * @param { Response } res - The response object to send back to the client.
 * @param { NextFunction } next - The next middleware function in the stack.
 * @returns { Promise<Response> } A JSON response indicating the success or failure of the comment deletion.
 */
export const DeleteComment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Find a comment by its id 
        const comment = await Comment.findById(req.params.commentId)
        
        // Extract userId from request object
        const userId = typeof req.user === 'string' ? undefined : req.user?.userId;


        // Check if the user is the owner of the post
        if (comment?.author.toString() !== userId?.toString()) {
            return res.status(403).json({ message: 'Unauthorized request. Only authors can delete their comments' });
        };

        // Delete the comment
        await Comment.findByIdAndDelete(req.params.commentId);

        // Return success response
        return res.status(204).json({ message: "Comment deleted successfully" });
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};