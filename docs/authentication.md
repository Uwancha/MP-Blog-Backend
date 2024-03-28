# API Documentation

## Authentication

How users can authenticate themselves to access the API endpoints.

## Endpoints

### User Authentication

#### Register User
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
```json
  {
    "username": "example",
    "password": "password"
  }
```

- **Responses:**
  - 200 OK - Successfully registered.
  - 400 Bad Request - Invalid request body.
  - 409 Conflict - User with the same username already exists.

#### Login User
- **URL:** /api/auth/login
- **Method:** POST
- **Description:** Authenticates a user.
- **Request Body:**
```json
  {
    "username": "example",
    "password": "password"
  }
```

- **Responses:**
  - 200 OK - Successfully authenticated. Returns JWT token.
  - 401 Unauthorized - Invalid credentials.
  - 404 Not Found - User not found.