# MosKrypton
This API saves the galaxy by allowing kryptonians to register, authenticate, manage files, and access images. It includes a token-based authentication and API key management.


## Development Dependencies & Their Software Version
- Nodejs (^18.12.1) 
- Express (^4.17.1) 
- Dotenv (^10.0.0) 
- Bcrypt (^5.1.1) 
- Nodemailer (^6.6.3) 
- Cors (^2.8.5) 
- Express Async Errors (^3.1.1) 
- Fs(^0.0.1-security) 
- Multer (^1.4.5-lts.1) 
- Path (^0.12.7) 
- Json Web Token (^8.5.1) 
- Mongoose (^5.13.7) 
- Morgan (^1.10.0) 
- Redis (^4.6.14)
- Redis-CLI (^2.1.2) 
- Crypto (^1.0.1) 


## How to Install And Run Code

- Download the repository as a zip file or copy the repository url and clone to your pc with "git clone" in your IDE terminal. 
- Use "npm install" to install all dependencies. 
- Check the contents of the .env.example to set up your .env file 
- Connect your MongoDB Atlas database with your connection url. 
- Use "npm run dev" to run the program. 
- Download Postman, Swagger, Insomnia or use the Thunder Client extension on your IDE (preferably VS Code) to simulate the requests as a user on the client side. 

## Overview
This API design includes JWT token-based authentication and API key management. It allows users to register, authenticate, manage files and access images.

### Base URL -
`https://verify-krypton.onrender.com/api/v1`

---

## Authentication Endpoints

### Register User
- **URL**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "role": "(kryptonian or supergirl, kryptonian as default so this is optional)" 
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### Confirm Email
- **URL**: `/confirm-email/:token`
- **Method**: `GET`
- **Description**: Confirms the user's email using a token.
- **Response**:
  ```json
  {
    "message": "Email confirmed successfully"
  }
  ```

### Login
- **URL**: `/login`
- **Method**: `POST`
- **Description**: Authenticates the user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP sent to your email"
  }
  ```

### Verify OTP
- **URL**: `/verify-otp`
- **Method**: `POST`
- **Description**: Verifies the OTP sent to the user.
- **Request Body**:
  ```json
  {
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP verified successfully"
  }
  ```

---

## API Key Management

### Generate API Key
- **URL**: `/generate-api-key`
- **Method**: `POST`
- **Description**: Generates a new API key for the authenticated user.
- **Headers**:
  - `Authorization`: `Bearer jwt-token`
- **Response**:
  ```json
  {
    "status": 200,
    "success": true,
    "message": "API Key generated successfully!",
    "data": {
        "apiKey"
    }
  }
  ```

### Invalidate API Key
- **URL**: `/invalidate-api-key`
- **Method**: `POST`
- **Description**: Invalidates the user's API key.
- **Headers**:
  - `Authorization`: `Bearer jwt-token`
- **Response**:
  ```json
  {
    "status": 200,
    "success": true,
    "message": "",
    "data": {
        "message": "API key invalidated successfully"
    }
  }
  ```

---

## File Management

### Upload File
- **URL**: `/upload`
- **Method**: `POST`
- **Description**: Uploads a file.
- **Headers**:
  - `x-api-key`: `api-key`
- **Request Body**:
  - `file`: File to upload
- **Response**:
  ```json
  {
    "message": "File uploaded successfully",
    "fileUrl": "url-to-file"
  }
  ```

### Download File
- **URL**: `/download/:userId/:fileId`
- **Method**: `GET`
- **Description**: Downloads a file.
- **Headers**:
  - `x-api-key`: `api-key`
- **Response**: File data

### Update File
- **URL**: `/update/:userId/:fileId`
- **Method**: `PUT`
- **Description**: Updates an existing file.
- **Headers**:
  - `x-api-key`: `api-key`
- **Request Body**:
  - `file`: New file to upload
- **Response**:
  ```json
  {
    "message": "File updated successfully"
  }
  ```

### Delete File
- **URL**: `/delete/:userId/:fileId`
- **Method**: `DELETE`
- **Description**: Deletes a file.
- **Headers**:
  - `x-api-key`: `api-key`
- **Response**:
  ```json
  {
    "message": "File deleted successfully"
  }
  ```

---

## Image Access

### Get All Images
- **URL**: `/images/:userId`
- **Method**: `GET`
- **Description**: Retrieves all images for a user.
- **Headers**:
  - `x-api-key`: `api-key`
- **Response**:
  ```json
  [
    {
      "imageId": "image-id",
      "url": "image-url",
      ...
    }
  ]
  ```

### Get Image By ID
- **URL**: `/images/:userId/:imageId`
- **Method**: `GET`
- **Description**: Retrieves a specific image by ID.
- **Headers**:
  - `x-api-key`: `api-key`
- **Response**:
  ```json
  {
    "imageId": "image-id",
    "url": "image-url",
    ...
  }
  ```

### Get Last Image
- **URL**: `/last-image/:userId`
- **Method**: `GET`
- **Description**: Retrieves the last uploaded image for a user.
- **Headers**:
  - `x-api-key`: `api-key`
- **Response**:
  ```json
  {
    "imageId": "image-id",
    "url": "image-url",
    ...
  }
  ```

### Create Shared Image
- **URL**: `/images/:userId/share`
- **Method**: `POST`
- **Description**: Shares an image with another user.
- **Headers**:
  - `x-api-key`: `api-key`
- **Request Body**:
  ```json
  {
    "imageData": "data",
    "sharedWith": "targetUserId"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Image shared successfully"
  }
  ```

### Get Shared Images
- **URL**: `/shared-images/:userId/:targetUserId`
- **Method**: `GET`
- **Description**: Retrieves images shared with another user.
- **Headers**:
  - `x-api-key`: `api-key`
- **Response**:
  ```json
  [
    {
      "imageId": "image-id",
      "url": "image-url",
      ...
    }
  ]
  ```

## Supergirl Image Access

### Get All Images for Supergirl
- **URL**: `/supergirl/images/:userId`
- **Method**: `GET`
- **Description**: Retrieves all images for a user without authentication.
- **Middleware**: `isSupergirl`
- **Response**:
  ```json
  [
    {
      "imageId": "image-id",
      "url": "image-url",
      ...
    }
  ]
  ```

### Get Image By ID for Supergirl
- **URL**: `/supergirl/images/:userId/:imageId`
- **Method**: `GET`
- **Description**: Retrieves a specific image by ID without authentication.
- **Middleware**: `isSupergirl`
- **Response**:
  ```json
  {
    "imageId": "image-id",
    "url": "image-url",
    ...
  }
  ```

### Get Last Image for Supergirl
- **URL**: `/supergirl/last-image/:userId`
- **Method**: `GET`
- **Description**: Retrieves the last uploaded image for a user without authentication.
- **Middleware**: `isSupergirl`
- **Response**:
  ```json
  {
    "imageId": "image-id",
    "url": "image-url",
    ...
  }
  ```

### Create Shared Image for Supergirl
- **URL**: `/supergirl/images/:userId/share`
- **Method**: `POST`
- **Description**: Shares an image with another user without authentication.
- **Middleware**: `isSupergirl`
- **Request Body**:
  ```json
  {
    "imageData": "data",
    "sharedWith": "targetUserId"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Image shared successfully"
  }
  ```

### Get Shared Images for Supergirl
- **URL**: `/supergirl/shared-images/:userId/:targetUserId`
- **Method**: `GET`
- **Description**: Retrieves images shared with another user without authentication.
- **Middleware**: `isSupergirl`
- **Response**:
  ```json
  [
    {
      "imageId": "image-id",
      "url": "image-url",
      ...
    }
  ]
  ```

---

## Error Handling
All responses will include a status code and a message indicating success or failure. Common status codes include:
- `200 OK`: Request succeeded.
- `201 Created`: Resource created successfully.
- `400 Bad Request`: The request could not be understood or was missing required parameters.
- `401 Unauthorized`: Authentication failed or user does not have permissions.
- `403 Forbidden`: Access denied.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: An error occurred on the server.

---

## Useful links below:

- [MosKrypton API Live URL](https://verify-krypton.onrender.com)

- [MosKrypton API Documentation](https://verify-krypton.onrender.com/api/v1/docs)