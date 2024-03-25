## Profile Controllers Documentation

### GetUserProfile

Description: This controller retrieves the profile information of a user.

- HTTP Method: GET

- Endpoint: /api/profile/:userId

- Request Parameters:
    - `userId:` The ID of the user whose profile information is being retrieved

- Expected Response:
    - Status Code: 200 OK
        -Response Body: JSON object containing the user's profile information

- Error Handling:
    - Status Code: 404 Not Found (if the specified user does not exist)

    -Status Code: 500 Internal Server Error (for database or server-related errors)

### UpdateUserBio

Description: This controller updates the biography of a user.

- HTTP Method: PUT

- Endpoint: /api/profile/:userId/bio

- Request Parameters:
    - `userId:` The ID of the user whose biography is being updated

- Request Body:
    - `bio:` The updated biography of the user (string)

- Expected Response:
    - Status Code: 200 OK
        - Response Body: JSON object containing the updated user profile

- Error Handling:
    - Status Code: 404 Not Found (if the specified user does not exist)

    - Status Code: 500 Internal Server Error (for database or server-related errors)

### UpdateUserAvatar

Description: This controller updates the avatar of a user.

- HTTP Method: PUT

- Endpoint: /api/profile/:userId/avatar

- Request Parameters:
    - `userId:` The ID of the user whose avatar is being updated

- Request Body:
    - `avatar:` The URL or path of the new avatar image (string)

- Expected Response:
    - Status Code: 200 OK

- Response Body: JSON object containing the updated user profile

- Error Handling:
    - Status Code: 404 Not Found (if the specified user does not exist)
    
    - Status Code: 500 Internal Server Error (for database or server-related errors)
