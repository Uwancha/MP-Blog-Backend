# Blog Backend

This is the backend for a blog application with authentication functionality. The backend is responsible for handling user authentication and managing blog posts through a RESTful API built using Node.js.

## Features

- User registration and login functionality.
- Secure password storage using hashing techniques.
- Authentication and authorization using JSON Web Tokens (JWT).
- CRUD (Create, Read, Update, Delete) operations for blog posts.
- Validation and error handling for API requests.
- Integration with a database to store user and blog post data.

## Technologies Used
- Node.js
- Express.js
- MongoDB/Mongoose
- JSON Web Tokens (JWT) for authentication
- Express Validator for request validation
- bcrypt for password hashing

## Getting Started
To get started with the backend of the blog application, follow these steps:

- 1. Clone the repository:
```bash
    git clone <repository-url>
```

- 2. Install dependencies:

```bash
npm install
```
- 3. Set up your environment variables:

Create a .env file in the root directory and add the following variables:
```plaintext
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```
- 4. Run the server:

```bash
npm start
```

## API Documentation
Please refer to the API documentation provided in the docs folder for details on the available endpoints, request parameters, and responses.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## Contributors
[Sitota Alemu](https://github.com/Uwancha)

## License
This project is licensed under the [MIT License](LICENSE).