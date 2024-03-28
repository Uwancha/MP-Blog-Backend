import { model, Schema } from 'mongoose';

// Define User interface
export interface IUser {
    username: string;
    password: string;
    profile?: Profile;
};

/**
 * Represents additional profile information for a user.
 */

interface Profile {
    bio?: string;
    avatar?: string;
};

// Define the User Schema
const UserSchema = new Schema<IUser>(
    {
        // Define the username field
        username: {
            type: String,
            required: true,
            unique: true, // Ensures usernames are unique
        },

        // Define the password field
        password: {
            type: String,
            required: true 
        },

        // Define the profile subdocument
        profile: {
            // Optional bio section
            bio: {
                type: String,
                required: false
            },

            // Optional avatar URL
            avatar: {
                type: String,
                required: false
            },
        }
    }
);

// Create the User model using the UserSchema
const User = model<IUser>('User', UserSchema);

// Export the User model
export { User };
