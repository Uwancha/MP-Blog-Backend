import { model, Schema, SchemaTypes, Types } from 'mongoose';

// Define Post interface
export interface IPost {
    title: string;
    body: string;
    author: Types.ObjectId;
    comments?: Types.ObjectId[];
    tags: string[]
};

// Define the Post Schema
const PostSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true
        },

        body: {
            type: String,
            required: true
        },

        author: {
            type: SchemaTypes.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        },

        comments: [
            {
                type: SchemaTypes.ObjectId,
                ref: 'Comment', // Reference to the Comment model
                required: true
            }
        ],

        tags: {
            type: [String],

            // Validate that each tag is a string
            validate: {
                validator: (tags: string[]) => tags.every(tag => typeof tag === 'string'),
                message: 'Tags must be strings'
            }
        }
    },

    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true
    }
);

// Create the Post model using the PostSchema
const Post = model<IPost>('post', PostSchema);

// Export the Post model
export { Post }