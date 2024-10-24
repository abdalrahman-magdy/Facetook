# Simple Facebook Application

This is a basic Facebook-like application built using **Node.js**, **Express**, and **Sequelize**. The application handles **users**, **posts**, and **comments** with various CRUD operations and includes basic user authentication. The project uses **bcrypt.js** for secure password storage.

## Features

- User registration, login, and logout (email is unique).
- Create, read, update, and delete posts.
- Create, read, update, and delete comments.
- Users can only edit or soft delete their own posts.
- Special endpoints for:
  - Fetching a specific user with their posts and comments.
  - Fetching a specific post with the author's details.

## Requirements

- **Node.js** (v16.x or later)
- **Sequelize** (v6.x)
- **Express** (v4.x)
- **bcrypt.js** for password hashing
- **MySQL** (or any other database supported by Sequelize)

## Models

### 1. User Model

Fields:
- `username` (String, required)
- `email` (String, required, unique)
- `password` (String, required)

### 2. Post Model

Fields:
- `title` (String, required)
- `content` (Text, required)
- `author` (Foreign key to the **User** model)

### 3. Comment Model

Fields:
- `content` (Text, required)
- `postId` (Foreign key to the **Post** model)
- `userId` (Foreign key to the **User** model)

## Routes

### User Routes

- `POST /signup` - Register a new user
  - Example request body:
    ```json
    {
      "name": "mohamed",
      "email": "mohamed@gmail.com",
      "password": "1234"
    }
    ```

- `POST /login` - Log in a user
  - Example request body:
    ```json
    {
      "email": "mariem@gmail.com",
      "password": "1234"
    }
    ```

- `POST /logout` - Log out a user

- `GET /get-user1-info1` - Get a specific user's posts and comments

### Post Routes

- `POST /posts/add-post` - Create a new post
  - Example request body:
    ```json
    {
      "title": "Node.js Course",
      "content": "This course wasn't bad but it had room for improvements",
      "author": 2
    }
    ```

- `GET /posts` - Get all posts

- `GET /posts/:id` - Get a specific post with author details

- `PUT /posts/update-post` - Update a post (only by the post's author)
  - Example request body:
    ```json
    {
      "authorId": 1,
      "id": 1,
      "title": "my experience at route",
      "content": "not bad honestly"
    }
    ```

- `PUT /posts/restore-post` - Restore a soft deleted post
  - Example request body:
    ```json
    {
      "authorId": 1,
      "postId": 1
    }
    ```

- `DELETE /posts/delete-post` - Soft delete a post (only by the post's author)

### Comment Routes

- `POST /comments/add-comment` - Add a comment to a specific post
  - Example request body:
    ```json
    {
      "content": "yeah, it really did",
      "userId": 1,
      "postId": 2
    }
    ```

- `GET /comments/get-all-comments` - Get all comments

- `GET /comments/get-comments/:postId` - Get comments on a specific post

- `PUT /comments/update-comment/:id` - Update a comment (only by the comment's author)

- `DELETE /comments/delete-comment/:id` - Delete a comment (only by the comment's author)

## Authentication & Security

- **bcrypt.js** is used to hash and securely store user passwords.
- There is no session management, cookies, or tokens for authentication in this implementation.

## Getting Started

1. Clone the repository.
2. Install the dependencies:
   ```bash
   npm install
