import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

/**
 * Middleware to validate user input during signup.
 */
export const ValidateUser = [
    // Validate username
    body("username", "User name is required")
        .trim()
        .notEmpty()
        .escape()
        .isLength({min: 3})
        .withMessage("Name must be greater than 2 charcters"),

    // Validate password
    body("password", "password is required")
        .trim()
        .notEmpty()
        .escape()
        .isLength({min: 8})
        .withMessage("Password must be at least 8 charcters"),

    // Handle validation errors
    async (req: Request, res: Response, next: NewableFunction) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        return next();
    },
];
 
/**
 * Middleware to validate post inputs.
 */
export const ValidatePostInput = [
    // Validate title
    body('title', 'Title is required')
        .trim()
        .notEmpty()
        .escape(),

    // Validate body
    body('body', 'Body is required')
        .trim()
        .notEmpty()
        .escape(),

    // Validate tags
    body('tags', 'Tags are required as an array of strings')
        .isArray()
        .withMessage('Tags must be an array')
        .notEmpty()
        .withMessage('Tags array cannot be empty')
        .custom((value: any[]) => {
            // Check if each element in the array is a string
            if (!value.every((tag) => typeof tag === 'string')) {
            throw new Error('Each tag must be a string');
            }
            return true;
        }),

    // Handle validation erros
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(422).json({message: 'validation errors', errors: errors.array()});
        };

        // Proceed to next middlewares
        return next();
    },
];

/**
 * Middleware to validate comment input.
 */
export const ValidateCommentInput = [
    // Validate message
    body('message', 'Message is required')
        .trim()
        .notEmpty()
        .escape()
        .isLength({max: 1000})
        .withMessage('Comment must be lower than 1000 characters'),

    // Handle validation erros
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(422).json({message: "Validation errors", errors: errors.array()});
        };
        
        // Proceed to next middlewares
        return next()
    },
];

/**
 * Middleware to validate bio input.
 */
export const ValidateBioInput = [
    // Validate bio
    body('bio', 'Bio is required')
        .trim()
        .notEmpty()
        .escape()
        .isLength({max: 200})
        .withMessage('Bio must be lower than 200 characters'),

    // Handle validation errors
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(422).json({message: "Validation errors", errors: errors.array()});
        };
        
        // Proceed to next middlewares
        return next()
    },
];