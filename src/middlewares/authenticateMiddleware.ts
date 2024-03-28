import Jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Define a custom interface that extends express Request
export interface CustomRequest extends Request {
    user?: JwtPayload | string;
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
        if (error instanceof Jwt.JsonWebTokenError) {
            // Token is invalid or malformed
            return res.status(403).json({ message: "Invalid token" });
        } else if (error instanceof Jwt.TokenExpiredError) {
            // Token has expired
            return res.status(403).json({ message: "Token has expired" });
        } else {
            // Other errors
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};
