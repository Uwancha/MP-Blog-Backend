### Authentication Controllers

The authentication controllers handle user registration and login functionality.

#### Register User

Registers a new user in the system.

- Method: POST
- Route: api/auth/register
- Parameters:
  - `username` (String): The username of the user.
  - `password` (String): The password of the user.
- Response:
  - Success: 200 OK with user data.
  - Failure: 400 Bad Request with error message.

#### Login User

Authenticates a user and generates a JWT token.

- Method: POST
- Route: api/auth/login
- Parameters:
  - `username` (String): The username of the user.
  - `password` (String): The password of the user.
- Response:
  - Success: 200 OK with JWT token and user data.
  - Failure: 401 Unauthorized with error message.
