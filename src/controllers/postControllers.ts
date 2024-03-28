import { NextFunction, Request, Response } from 'express';
import { Post } from '../models/postModel';
import { CustomRequest } from '../middlewares/authenticateMiddleware';


/**
 * Fetches all posts from the database.
 * @param { Request } req - Express Request object
 * @param { Response } res - Express Response object
 * @param { NextFunction }  next - Express Next function
 * @returns { Promise<Response> } - Returns a JSON response with all posts or an error message
 */
export const GetAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve all posts from the database
        const allPosts = await Post.find().populate({path: 'author', select: 'username profile'}).sort({createdAt: -1});

        // Check if no post exists
        if (!allPosts.length) {
            return res.status(404).json({ data: [] });
        };

        // Return all the retrieved posts
        return res.status(200).json({data: allPosts});
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};  

/**
 * Fetches a single post by ID.
 * @param { Request } req - Express Request object with postId parameter
 * @param { Response } res - Express Response object
 * @param { NextFunction } next - Express Next function
 * @returns { Promise<Response> } - Returns a JSON response with the requested post or an error message
 */
export const GetAPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch the post by ID, populating the author's details
        const post = await Post.findById(req.params.postId)
            .populate({
                path: 'author',
                select: 'username profile'
            });

        // Check if no post exists with the given post id
        if (!post) {
            return res.status(404).json({ data: null });
        };

        // Populate comments only if the post has comments
        if (post?.comments && post.comments.length > 0) {
            await post.populate({path : 'comments', populate: { path: 'author', select: 'username profile' } } );
        };

        // Return the retrieved post
        return res.status(200).json({data: post});
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};

/**
 * Creates a new post.
 * @param { Request } req - Express Request object with title, body, and tags
 * @param { Response } res - Express Response object
 * @param { NextFunction } next - Express Next function
 * @returns { Promise<Response> } - Returns a JSON response with the newly created post or an error message
 */
export const CreatePost = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Extract post information and author ID from the request
        const { title, body, tags } = req.body;
        const userId = typeof req.user === 'string' ? undefined : req.user?.userId;


        // Create a new post
        const newPost = await Post.create({
            title,
            body,
            tags,
            author: userId
        });

        // Return the new created post along with a success message
        return res.status(200).json({ message: 'Post created successfully', data: newPost });
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};

/**
 * Updates an existing post.
 * @param { Request } req - Express Request object with postId, title, body, and tags
 * @param { Response } res - Express Response object
 * @param { NextFunction } next - Express Next function
 * @returns { Promise<Response> } - Returns a JSON response with the updated post or an error message
 */
export const UpdatePost = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Extract post ID and updated information from the request
        const postId = req.params.postId;
        const userId = typeof req.user === 'string' ? undefined : req.user?.userId;
        const { title, body, tags } = req.body;
    
        // Find the post by its ID
        const existingPost = await Post.findById(postId);
    
        // Check if the post exists
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        };

        // Check if the authenticated user is the owner of the post
        if (existingPost.author.toString() !== userId?.toString()) {
            return res.status(403).json({ message: 'Forbidden. You are not the owner of this post.' });
        };
    
        // Update the post data
        const UpdatedPost = await Post.findByIdAndUpdate(postId, { title, body, tags }, { new: true } );
    
        // Return the updated post along with a success message
        return res.status(200).json({ message: 'Post updated successfully', data: UpdatedPost });
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};

/**
 * Deletes a post by its ID.
 * @param { Request } req - Express Request object with postId
 * @param { Response } res - Express Response object
 * @param { NextFunction } next - Express Next function
 * @returns { Promise<Response> } - Returns a JSON response with success message or an error message
 */
export const DeletePost = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Find the post by its ID
        const post = await Post.findById(req.params.postId);

        // Ensure the post exists to delete
        if (!post) {
            return res.status(404).json({ data: null });
        };
        
        // Extract userId from request object
        const userId = typeof req.user === 'string' ? undefined : req.user?.userId;


        // Check if the authenticated user is the owner of the post
        if (post?.author.toString() !== userId?.toString()) {
            return res.status(403).json({ message: 'Forbidden. Unauthorized user.' });
        };

        // Delete the post
        await Post.findByIdAndDelete(req.params.postId);

        // Return a success message
        return res.status(204).json({ message: 'Post deleted successfully' });
    } catch (error) {
        // Pass the error to the error handling middleware
        return next(error);
    };
};