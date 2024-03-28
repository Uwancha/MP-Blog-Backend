import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { ValidateUser } from '../middlewares/validateMiddlewares';

/**
 * Registers a new user.
 * @param { Request } req - The request object.
 * @param { Response } res - The response object.
 * @param { NextFunction } next - The next middleware function.
 * @returns { Promise<Response> } Returns a JSON response with newly created user or failure message.
 */
export const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
    // Validate user inputs
    ValidateUser;

    try {
        // Extract username and body from the request body
        const { username, password } = req.body;

        // Check if user with the same username already exists
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(409).json({message: "User already exists with this user name", userExists});
        };

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            username,
            password: hashedPassword,
        });

        // Return success response
        return res.status(200).json({message: "User registered successfully", user});
    } catch (error) {
        // Forward error to the error handling middleware
        return next(error);
    };
};

/**
 * Authentices a user.
 * @param { Request } req - The request object.
 * @param { Response } res - The response object.
 * @param { NextFunction } next - The next middleware function.
 * @returns { Promise<Response> } Return JSON response with JWT token and user information or failure message.
 */
export const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    // Validate user inputs
    ValidateUser;
    
    try {
        // Extract username and body from the request body
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Incorrect username" });
        };

        // Check if the password is correct
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(401).json({message: "Incorrect password"});
        };

        // Generate JWT token with default HS256 algorithm
        const jwtSecret = process.env.JWTSECRET as string;
        const token = Jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
         
        // Return token and user information
        return res.status(200).json({ token, user: { id: user.id, username } });
    } catch (error) {
        // Forward error to the error handling middleware
        return next(error);
    };
};