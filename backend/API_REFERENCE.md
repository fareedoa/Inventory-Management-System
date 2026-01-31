#  Inventory Management System - API Reference

> **Base URL:** `http://localhost:3000/api`

## Authentication (`/auth`)

| Method | Endpoint | Access | Description |
|:-------|:---------|:-------|:------------|
| `POST` | `/auth/register` |  Public | Register new user |
| `POST` | `/auth/register` | Public | Register new user |
| `POST` | `/auth/login` | Public | Login user |
| `GET` | `/auth/me` | Private | Get current current user info |
| `PUT` | `/auth/updatepassword` | Private | Change password |

---

##  Products (`/products`)

> Read operations are **Public**. Write operations are restricted to **Admin** users.

| Method | Endpoint | Access | Description |
|:-------|:---------|:-------|:------------|
| `GET` | `/products` |  Public | Get all products |
| `POST` | `/products` |  Admin | Create product |
| `GET` | `/products/:id` |  Public | Get single product |
| `PUT` | `/products/:id` | Admin | Update product |
| `DELETE` | `/products/:id` | Admin | Delete product |
| `GET` | `/products/lowstock` |  Public | Get low stock items |
| `GET` | `/products/outofstock`|  Public | Get out of stock items |

---

##  Categories (`/categories`)

> Read operations are **Public**. Write operations are restricted to **Admin** users.

| Method | Endpoint | Access | Description |
|:-------|:---------|:-------|:------------|
| `GET` | `/categories` |  Public | Get all categories |
| `GET` | `/categories/:id` | Public | Get single category |
| `POST` | `/categories` |  Admin | Create category |
| `PUT` | `/categories/:id` |  Admin | Update category |
| `DELETE` | `/categories/:id` |  Admin | Delete category |
| `PATCH` | `/categories/:id/toggle` |  Admin | Toggle active status |

---

##  Users (`/users`)

> **Note:** All user routes require **Admin** role.

| Method | Endpoint | Access | Description |
|:-------|:---------|:-------|:------------|
| `GET` | `/users` |  Admin | Get all users |
| `GET` | `/users/:id` |  Admin | Get single user |
| `PUT` | `/users/:id` |  Admin | Update user details |
| `DELETE` | `/users/:id` |  Admin | Delete user |
| `PATCH` | `/users/:id/role` |  Admin | Change user role (user/admin) |
| `PATCH` | `/users/:id/toggle` |  Admin | Activate/deactivate user |

---

##  System

| Method | Endpoint | Access | Description |
|:-------|:---------|:-------|:------------|
| `GET` | `/api/health` |  Public | Check server status |
| `GET` | `/api` |  Public | API Info & Version |

---

##  Access Key

-  **Public**: No authentication needed
-  **Private**: Requires valid JWT token in header (`Authorization: Bearer <token>`)
-  **Admin**: Requires valid JWT token AND user must have `role: "admin"`
