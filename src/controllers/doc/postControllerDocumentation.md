## Post Controllers

### GetAllPosts

Description: This controller fetches all posts from the database.

- HTTP Method: GET

- Endpoint: /api/posts

- Request Parameters: None

- Request Body: None

- Expected Response:
    - Status Code: 200 OK
        - Response Body: JSON object containing an array of posts

-Error Handling:
    -Status Code: 404 Not Found
        -Response Body: { data: [] } (if no posts are found)
    
    -Status Code: 500 Internal Server Error (for database or    server-related errors)

### GetAPost

Description: This controller fetches a single post by its ID.

- HTTP Method: GET

- Endpoint: /api/posts/:postId

- Request Parameters:
    - `postId:` The ID of the post to retrieve

- Request Body: None

- Expected Response:
    -Status Code: 200 OK
        -Response Body: JSON object containing the requested post
    
    -Status Code: 404 Not Found (if no post is found with the specified ID)

-Error Handling:
    -Status Code: 404 Not Found
        -Response Body: { data: null } (if no post is found with the specified ID)

    -Status Code: 500 Internal Server Error (for database or server-related errors)

### CreatePost

Description: This controller creates a new post.

- HTTP Method: POST

- Endpoint: /api/posts

- Request Parameters: None

- Request Body:
    - `title:` Title of the post (string)

    - `body:` Body of the post (string)

    - `tags:` Tags associated with the post (array of strings)

- Expected Response:
    - Status Code: 200 OK
        -Response Body: JSON object containing the newly created post

- Error Handling:
    - Status Code: 422 Bad Request (if request body is invalid)

    - Status Code: 500 Internal Server Error (for database or server-related errors)

### UpdatePost

Description: This controller updates an existing post.

- HTTP Method: PUT

- Endpoint: /api/posts/:postId

- Request Parameters:

    - `postId:` The ID of the post to update

- Request Body:
    - `title:` Updated title of the post (string)

    - `body:` Updated body of the post (string)

    - `tags:` Updated tags associated with the post (array of strings)

- Expected Response:
    - Status Code: 200 OK

- Response Body: JSON object containing the updated post

- Error Handling:
    - Status Code: 404 Not Found (if no post is found with the specified ID)

    - Status Code: 422 Invalid inputs

    - Status Code: 401 Unauthorized(if no token exists)

    - Status Code: 403 Forbidden (if the authenticated user is not the owner of the post)

    - Status Code: 500 Internal Server Error (for database or server-related errors)

### DeletePost

Description: This controller deletes a post by its ID.

- HTTP Method: DELETE

- Endpoint: /api/posts/:postId

- Request Parameters:
    - `postId:` The ID of the post to delete

- Request Body: None

- Expected Response:
    -Status Code: 204 No Content

- Error Handling:
    - Status Code: 404 Not Found (if no post is found with the specified ID)

    - Status Code: 401 Unauthorized(if no token exists)

    - Status Code: 403 Forbidden (if the authenticated user is not the owner of the post)

    - Status Code: 500 Internal Server Error (for database or server-related errors)