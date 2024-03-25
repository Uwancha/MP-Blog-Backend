# API Documentation

### Posts

### Get All Posts

- **URL:** /api/posts
- **Method:** GET
- **Description:** Retrieves all posts from the database.
- **Responses:**
    - 200 OK - Successfully retrieved posts.
    - 404 Not Found - No posts found.

### Get a Post

- **URL:** /api/posts/:postId
- **Method:** GET
- **Description:** Retrieves a single post by ID.
- **Parameters:**
    - `postId (path)-` ID of the post.
- **Responses:**
    - 200 OK - Successfully retrieved the post.
    - 404 Not Found - Post not found.

### Create a Post

- **URL:** /api/posts
- **Method:** POST
- **Description:** Creates a new post.
- **Request Body:**
```json
    {
        "title": "Post title",
        "body": "Post body",
        "tags": ["tag1", "tag2"]
    }
```

- **Responses:**
    - 200 OK - Successfully created the post.
    - 400 Bad Request - Invalid request body.

### Update a Post

- **URL:** /api/posts/:postId
- **Method:** PUT
- **Description:** Updates an existing post.
- **Parameters:**
    - `postId (path)-` ID of the post.

- **Request Body:**
```json
    {
        "title": "Updated title",
        "body": "Updated body",
        "tags": ["tag1", "tag2"]
    }
```

- **Responses:**
    - 200 OK - Successfully updated the post.
    - 400 Bad Request - Invalid request body.
    - 404 Not Found - Post not found.
    - 403 Forbidden - User not authorized to update the post.

### Delete a Post

- **URL:** /api/posts/:postId
- **Method:** DELETE
- **Description:** Deletes a post by ID.
- **Parameters:**
    - `postId (path)-` ID of the post.

- **Responses:**
    - 204 No Content - Successfully deleted the post.
    - 404 Not Found - Post not found.
    - 403 Forbidden - User not authorized to delete the post.
