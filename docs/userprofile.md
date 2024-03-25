# API Documentation

## User Profile

### Get User Profile

- **URL:** /api/profile/:userId
- **Method:** GET
- **Description:** Retrieves user profile information.
- **Parameters:**
  - `userId (path)-` ID of the user.

- **Responses:**
  - 200 OK - Successfully retrieved user profile.
  - 401 Unauthorized - Authentication token missing or invalid.
  - 404 Not Found - User not found.

### Update User Bio

- **URL:** /api/profile/:userId/bio
- **Method:** PUT
- **Description:** Updates user biography.
- **Parameters:**
  - `userId (path)-` ID of the user.

- **Request Body:**
  ```json
  {
    "bio": "New biography"
  }```

- **Responses:**
  - 200 OK - Successfully updated user bio.
  - 401 Unauthorized - Authentication token missing or invalid.
  - 403 Forbidden - User not authorized to update profile.
  - 404 Not Found - User not found.

### Update User Avatar

- **URL:** /api/profile/avatar/:userId
- **Method:** PUT
- **Description:** Updates user avatar.
- **Parameters:**
  - `userId (path)-` ID of the user.
- **Request Body:**
  ```json
  {
    "avatar": "URL or file path"
  }```

- **Responses:**
  - 200 OK - Successfully updated user avatar.
  - 401 Unauthorized - Authentication token missing or invalid.
  - 403 Forbidden - User not authorized to update profile.
  - 404 Not Found - User not found.