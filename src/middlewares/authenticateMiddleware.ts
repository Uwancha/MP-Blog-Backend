import Jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define a custom interface that extends express Request
export interface CustomRequest extends Request {
    user?: string  | JwtPayload;
}

/**
 * Verifies JWT token.
 * @param {CustomRequest} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Response} An HTTP response indicating success or failure.
 */
export const VerifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Extract token from headers or cookies
    const token = req.headers.authorization?.split(' ')[1];

    // Ensure that the token exists
    if (!token) {
        return res.status(401).json({ message: "Authorization token is required" });
    };

    try {
        // Verify token using JWT secret
        // Will throw error if token is not verified
        const jwtSecret = process.env.JWTSECRET as string;
        const decoded = Jwt.verify(token, jwtSecret);

        // Attach decoded user information to request object
        req.user = decoded;

        // Call next middleware
        return next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    };
};
