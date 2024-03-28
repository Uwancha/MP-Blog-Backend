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
- TypeScript
- MongoDB/Mongoose
- JSON Web Tokens (JWT) for authentication
- Express Validator for request validation
- bcryptjs for password hashing

## Getting Started
To get started with the backend of the blog application, follow these steps:

- Clone the repository:
```bash
    git clone <repository-url>
```

- Install dependencies:

```bash
npm install
```
- **Alternatively:** you can download the zip file, extract it and follow the next steps.

- Set up your environment variables:

Create a .env file in the root directory and add the following variables:
```plaintext
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```
Since I used cloudinary for user profile images, you should set up environment variables for profile avatar updating endpoints to be functional. You can create free cloudinary account (here)[https://cloudinary.com/users/register_free]
```plaintext
CLOUDINARY_CLOUD_NAME=<your-cloudinary's-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary's-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary's-api-secret>
```
- 4. Run the development server:

```bash
npm run dev
```

## API Documentation
Please refer to the API documentation provided in the docs folder for details on the available endpoints, request parameters, and responses.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## Contributors
[Sitota Alemu](https://github.com/Uwancha)

## License
This project is licensed under the [MIT License](LICENSE).