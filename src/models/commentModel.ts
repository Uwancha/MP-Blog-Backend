import { model, Schema, SchemaTypes, Types } from 'mongoose';

// Define Comment interface
export interface IComment {
    message: string;
    author: Types.ObjectId;
};

// Define the Comment Schema
const CommentSchema = new Schema<IComment>(
    {
        message: {
            type: String,
            required: true
        },

        author: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        }
    },

    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true
    }
);

// Create the Comment model using the CommentSchema
const Comment = model<IComment>('Comment', CommentSchema);

// Export the Comment model
export { Comment };