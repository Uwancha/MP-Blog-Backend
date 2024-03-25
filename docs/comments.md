# API Documentation

## Comments

### Create a Comment

- **URL:** /api/comments/:postId
- **Method:** POST
- **Description:** Creates a new comment for a specific post.
- **Parameters:**
    - `postId (path)-` ID of the post the comment belongs to.
- **Request Body:**
    ```json
    {
        "message": "Comment message"
    }```

- **Responses:**
    - 200 OK - Successfully created the comment.
    - 400 Bad Request - Invalid request body.
    - 404 Not Found - Post not found.

### Update a Comment

- **URL:** /api/comments/:commentId
- **Method:** PUT
- **Description:** Updates an existing comment.
- **Parameters:**
    - `commentId (path)` - ID of the comment to be updated.
- **Request Body:**
    ```json
    {
        "text": "Updated comment text"
    }```

- **Responses:**
    - 200 OK - Successfully updated the comment.
    - 400 Bad Request - Invalid request body.
    - 404 Not Found - Comment not found.
    - 403 Forbidden - User not authorized to update the comment.

### Delete a Comment

- **URL:** /api/comments/:commentId
- **Method:** DELETE
- **Description:** Deletes a comment by ID.
- **Parameters:**
    - **commentId (path)-** ID of the comment to be deleted.

- **Responses:**
    - 204 No Content - Successfully deleted the comment.
    - 404 Not Found - Comment not found.
    - 403 Forbidden - User not authorized to delete the comment.
