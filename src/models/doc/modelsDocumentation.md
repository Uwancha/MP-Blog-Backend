## Models

###  User Model

The User model represents user data in the application.

#### Fields

- `username` (String): The username of the user. Required and unique.
- `password` (String): The password of the user. Required.
- `profile` (Object): Additional profile information for the user.
  - `bio` (String): The biography of the user.
  - `avatar` (String): URL of the user's avatar image.

### Post Model

The Post model represents posts created by users in the application.

#### Fields

- `title` (String): The title of the post. Required.
- `body` (String): The body content of the post. Required.
- `author` (ObjectID): The ID of the user who created the post.
- `tags` (Array of Strings): Tags associated with the post.

### Comment Model

The Comment model represents comments made on posts in the application.

#### Fields

- `message` (String): The content of the comment. Required.
- `author` (ObjectID): The ID of the user who made the comment.
