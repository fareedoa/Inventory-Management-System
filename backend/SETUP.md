# Inventory Management System - Backend Setup

## Overview

This document provides a complete walkthrough of the backend setup for the Inventory Management System built with Node.js, Express.js, and MongoDB.

---

## Folder Structure

```

backend/
├── config/
│   ├── database.js              # MongoDB connection
│   └── jwt.js                   # JWT configuration
│
├── controllers/
│   ├── authController.js        # Login, register, logout
│   ├── productController.js     # Product CRUD operations
│   ├── categoryController.js    # Category CRUD operations
│   └── userController.js        # User profile management
│
├── middleware/
│   ├── authMiddleware.js        # JWT verification
│   ├── errorHandler.js          # Global error handler
│   ├── logger.js                # Request logging
│   ├── notFound.js              # 404 handler
│   └── validate.js              # Input validation
│
├── models/
│   ├── User.js                  # User schema
│   ├── Product.js               # Product schema
│   └── Category.js              # Category schema
│
├── routes/
│   ├── authRoutes.js            # /api/auth/*
│   ├── productRoutes.js         # /api/products/*
│   ├── categoryRoutes.js        # /api/categories/*
│   ├── userRoutes.js            # /api/users/*
│   └── index.js                 # Route aggregator
│
├── utils/
│   ├── generateToken.js         # JWT token generator
│   └── validators.js            # Validation schemas
│
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
└── server.js                    # Entry point
```

---

## Core Components Explained

### 1. **Server Configuration** - [server.js]

The main entry point that orchestrates all components:

**Key Features:**
- **Express initialization** - Creates the Express application instance
- **Database connection** - Connects to MongoDB on startup
- **Middleware stack** - Applies CORS, JSON parsing, URL encoding, and logging
- **Route mounting** - Mounts API routes under `/api` prefix
- **Error handling** - Implements 404 and global error handlers
- **Server startup** - Listens on configured port

**Code Flow:**
```javascript
// 1. Import dependencies and modules
// 2. Initialize Express app
// 3. Connect to MongoDB
// 4. Apply middleware (CORS, JSON, logger)
// 5. Mount routes
// 6. Apply error handlers
// 7. Start server
```

---

### 2. **Database Configuration** - [config/database.js]

Handles MongoDB connection using Mongoose:

**Features:**
- **Async connection** - Uses async/await for clean error handling
- **Connection logging** - Logs successful connection with host info
- **Error handling** - Exits process on connection failure
- **Environment-based** - Uses `MONGO_URI` from environment variables

---

### 3. **Authentication & Authorization**

The system uses JWT (JSON Web Tokens) for secure authentication.

- **Controllers**: `controllers/authController.js` handles registration (`/register`), login (`/login`), and token management.
- **Middleware**: 
  - `authMiddleware.js`: Verifies JWT tokens on protected routes.
  - `adminMiddleware.js`: Ensures the authenticated user has admin privileges.
- **Utilities**: `utils/generateToken.js` creates signed JWTs.

---

### 4. **API Routes**

Routes are modularized in `routes/` and combined in `routes/index.js`.

**Key Endpoints:**

| Resource | Endpoints |
|----------|-----------|
| **Auth** | `POST /api/auth/register`, `POST /api/auth/login` |
| **Products** | `GET /api/products`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id` |
| **Categories**| `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id` |
| **Users** | `GET /api/users/profile`, `PUT /api/users/profile` |

---

### 5. **Environment Variables** - [.env]

Configuration stored outside code:

**Required Variables:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/inventory

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=1d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRE=3d

# Frontend Configuration
FRONTEND_URL=http://localhost:5173
```

> [!IMPORTANT]
> The `.env` file is excluded from git via `.gitignore`. Use `.env.example` as a template.

---

### 6. **Dependencies** - [package.json]

**Production Dependencies:**
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `dotenv`: Environment variable loader
- `cors`: Cross-Origin Resource Sharing
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT creation and verification

**Development Dependencies:**
- `nodemon`: Auto-restart on file changes

**Scripts:**
- `npm start`: Run server in production mode
- `npm run dev`: Run server with nodemon (auto-reload)

---

##  How to Run

### 1. **Install Dependencies**
```bash
cd backend
npm install
```

### 2. **Configure Environment**
```bash
# Copy example file
cp .env.example .env

# Edit .env with your settings (JWT secrets, Mongo URI via Docker or local)
```

### 3. **Start MongoDB**
Make sure MongoDB is running locally on port 27017, or update `MONGO_URI` in `.env`.

### 4. **Run the Server**

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 5. **Test the API**

**Using curl:**
```bash
# Health check
curl http://localhost:5000/api/health
```

---

##  Code Architecture Principles

### **Separation of Concerns**
- **Config**: Database and environment setup
- **Middleware**: Request processing, security, and error handling
- **Routes**: Endpoint definitions mapping to controllers
- **Controllers**: Business logic execution
- **Models**: Data schemas and database interactions

### **Error Handling Strategy**
1. Route handlers throw errors (or pass to `next(err)`).
2. `notFound` middleware catches undefined routes.
3. `errorHandler` middleware formats all errors consistently.
4. Client receives standardized JSON response.

---

