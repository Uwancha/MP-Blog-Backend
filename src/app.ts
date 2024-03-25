// Import necessary modules and packages
import { config as configDotenv } from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import createError from 'http-errors';
import { connect } from './db';
import { createLogger, format, transports } from 'winston';
import { AuthRoutes } from './routes/authRoutes';
import { PostRoutes } from './routes/postRoutes';
import { CommentRoutes } from './routes/commentRoutes';
import { ProfileRoutes } from './routes/profileRoutes';

// Define custom error interface to handle errors consistently
interface Error {
    status: number;
    message: string;
    stack?: Error; // Stack trace for better error logging
};

// Load environment variables from .env file
configDotenv();

// Initialize Express application
const app: Application = express();

// Initialize Winston logger with console and file transports
const logger = createLogger({
    transports: [
        // Console transport for logging to console
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                format.errors({ stack: true }),
                format.splat(),
                format.simple()
            )
        }),
        // File transport for logging errors to file
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

// Setup middlewares to parse JSON and  URL-encoded request bodies 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Helmet middleware for setting HTTP headers securely
app.use(helmet());

// Compression middleware for compressing HTTP responses
app.use(compression());

// Rate limiting middleware to prevent brute force and DoS attacks
const limiter = rateLimit({
    windowMs: 20 * 60 * 1000,
    max: 100
});
app.use(limiter);

// CORS middleware for enabling Cross-Origin Resource Sharing
app.use(cors())

// Setup routes
app.use('/api', AuthRoutes);
app.use('/api', PostRoutes);
app.use('/api', CommentRoutes);
app.use('/api', ProfileRoutes);

// Middleware to handle 404 Not Found errors
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "Not found"))
});

// Error handling middleware to handle all other errors
app.use((err: Error, req: Request, res: Response) => {
    // Log the error with additional information
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // Send appropriate response based on the error status
    if (err.status === 404) {
        res.status(404).json({ error: "Not found" });
    } else {
        res.status(err.status || 500).json({ error: "Internal server error" });
    }
});

// Asynchronous function to start the server
async function startServer() {
    try {
         // Connect to the database
        await connect();
  
        // Get the port number from environment variables or use default port 5000
        const port = process.env.PORT || 5000;

        // Start the Express server
        app.listen(port, () => {
            logger.info(`App listening on port ${port}!`);
        } );
  
    } catch (error) {
        // Log any errors that occur while starting the server
        logger.error('Error starting server:', error);
    };
};
  
// Call the startServer function to start the server
startServer();