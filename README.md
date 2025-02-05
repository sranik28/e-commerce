# E-Commerce

## Description
This is a Node.js and TypeScript-based project that utilizes Express.js for backend development. It includes essential tools for linting, formatting, and environment configuration.

## Features
- **TypeScript Support**: Uses TypeScript for a strongly-typed development experience.
- **Linting & Formatting**: ESLint and Prettier are configured for code quality.
- **Authentication**: Supports JWT-based authentication with bcrypt for password hashing.
- **File Uploads**: Uses Multer for handling file uploads.
- **Database**: MongoDB with Mongoose for schema validation and database interaction.
- **Environment Configuration**: dotenv is used to manage environment variables.

## Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd first-project
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Scripts

| Command           | Description |
|------------------|-------------|
| `npm run start:prod` | Starts the production server |
| `npm run start:dev` | Starts the development server with `ts-node-dev` |
| `npm run build` | Compiles TypeScript files to JavaScript |
| `npm run lint` | Runs ESLint to check for issues |
| `npm run lint:fix` | Fixes ESLint issues automatically |
| `npm run prettier` | Formats the code using Prettier |
| `npm run prettier:fix` | Fixes Prettier formatting issues |
| `npm run test` | Placeholder for tests |

## Project Structure

```
/src
  ├── server.ts        # Entry point for the application
  ├── routes           # API routes
  ├── controllers      # Business logic
  ├── models           # Database models
  ├── middlewares      # Middleware functions
  ├── utils            # Utility functions
/dist                  # Compiled JavaScript files (after build)
```

## Technologies Used
- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Cloudinary for media storage**
- **Multer for file uploads**
- **ESLint & Prettier for code quality**

## License
This project is licensed under the **ISC License**.

---

Let me know if you need any modifications! 🚀
