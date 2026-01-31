# Inventory Management System - Frontend

This is the frontend application for the Inventory Management System built with React.js, developed as part of a MERN stack project.

## 📋 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Features Implemented](#features-implemented)
- [Testing Guide](#testing-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **User Authentication** - Login and registration with JWT
- **Product Management** - Full CRUD operations for inventory items
- **Dashboard** - Overview of inventory statistics
- **Search & Filter** - Find products quickly
- **Responsive Design** - Works on all devices
- **Real-time Validation** - Form validation on the client side
- **Multiple Views** - Table and grid view for products
- **Stock Tracking** - Visual indicators for stock levels

## 🛠 Technologies Used

- **React 18.2.0** - UI Library
- **React Router 6.22.0** - Client-side routing
- **Axios 1.6.7** - HTTP client for API calls
- **React Toastify 10.0.4** - Toast notifications
- **React Icons 5.0.1** - Icon library
- **Vite 5.1.0** - Build tool and dev server

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

## 🚀 Installation

### Step 1: Navigate to Project Directory

```bash
cd inventory-management-system/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in package.json:
- react
- react-dom
- react-router-dom
- axios
- react-toastify
- react-icons

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and set your backend API URL:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── styles/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.css
│   │   │   ├── Loader.jsx
│   │   │   ├── Loader.css
│   │   │   ├── Modal.jsx
│   │   │   └── Modal.css
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   └── products/
│   │       ├── ProductCard.jsx
│   │       ├── ProductCard.css
│   │       ├── ProductForm.jsx
│   │       ├── ProductList.jsx
│   │       └── ProductTable.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Auth.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Products.jsx
│   │   ├── Products.css
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   ├── ProductFormPage.css
│   │   ├── Profile.jsx
│   │   └── Profile.css
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── productService.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── validators.js
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ▶️ Running the Application

### Development Mode

1. **Start the backend server first** (ensure it's running on port 3000)

2. **Start the frontend development server:**

```bash
npm run dev
```

3. **Open your browser and navigate to:**
```
http://localhost:5173
```

The application will automatically reload when you make changes to the code.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## ✅ Features Implemented

### 1. Authentication System
- ✅ User registration with validation
- ✅ User login with JWT token storage
- ✅ Logout functionality
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Persistent login state using localStorage

### 2. Dashboard
- ✅ Statistics cards (total products, total value, low stock, out of stock)
- ✅ Recent products table
- ✅ Quick access to add products
- ✅ Personalized welcome message

### 3. Product Management
- ✅ View all products (table and grid view)
- ✅ Add new products with form validation
- ✅ Edit existing products
- ✅ Delete products with confirmation
- ✅ Search products by name, description, or SKU
- ✅ Stock level indicators (in stock, low stock, out of stock)

### 4. User Profile
- ✅ View user information
- ✅ Update profile details
- ✅ Change password
- ✅ Tab navigation between sections

### 5. UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications for user feedback
- ✅ Loading states and spinners
- ✅ Form validation with error messages
- ✅ Clean and modern design
- ✅ Consistent color scheme
- ✅ Icon integration

## 🧪 Testing Guide

### Manual Testing Steps

#### 1. Test User Registration
1. Navigate to http://localhost:5173/register
2. Fill in the registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123
   - Confirm Password: Test@123
3. Click "Register"
4. Verify redirect to login page
5. Check for success toast notification

#### 2. Test User Login
1. Navigate to http://localhost:5173/login
2. Enter credentials:
   - Email: test@example.com
   - Password: Test@123
3. Click "Login"
4. Verify redirect to dashboard
5. Check that user name appears in navbar

#### 3. Test Add Product
1. Click "Add Product" button
2. Fill in product details:
   - Name: Laptop
   - Description: Dell XPS 15
   - Price: 1200
   - Quantity: 10
   - SKU: DELL-XPS-001
   - Category: Electronics
3. Click "Save Product"
4. Verify redirect to products page
5. Check product appears in list

#### 4. Test Edit Product
1. Navigate to products page
2. Click "Edit" button on a product
3. Modify product details
4. Click "Save Product"
5. Verify changes are reflected

#### 5. Test Delete Product
1. Navigate to products page
2. Click "Delete" button
3. Confirm deletion in modal
4. Verify product is removed from list

#### 6. Test Search
1. Navigate to products page
2. Enter search term in search box
3. Verify filtered results appear

#### 7. Test View Toggle
1. Navigate to products page
2. Click table/grid view buttons
3. Verify view changes accordingly

#### 8. Test Protected Routes
1. Logout from the application
2. Try to access /products or /dashboard
3. Verify redirect to login page

#### 9. Test Profile Management
1. Navigate to profile page
2. Update profile information
3. Change password
4. Verify success messages

#### 10. Test Responsive Design
1. Open browser DevTools
2. Toggle device toolbar
3. Test on different screen sizes
4. Verify layout adapts properly

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Set environment variables in Vercel Dashboard:**
   - Go to your project settings
   - Add `VITE_API_URL` with your production backend URL

### Deploy to Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Login to Netlify:**
```bash
netlify login
```

3. **Deploy:**
```bash
netlify deploy --prod
```

4. **Set environment variables in Netlify Dashboard:**
   - Go to Site settings > Build & deploy > Environment
   - Add `VITE_API_URL` with your production backend URL

## 🔧 Troubleshooting

### Issue: "Cannot connect to backend API"
**Solution:**
- Ensure backend server is running on port 3000
- Check VITE_API_URL in .env file
- Verify CORS is enabled on backend

### Issue: "Token expired" or "Unauthorized"
**Solution:**
- Clear localStorage in browser DevTools
- Login again
- Check JWT token expiration time in backend

### Issue: "Module not found" errors
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Issue: Port 5173 already in use
**Solution:**
```bash
# Kill the process using port 5173
# On Mac/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Issue: Changes not reflecting
**Solution:**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Restart dev server

## 📝 Notes

- Always start the backend server before the frontend
- Environment variables must start with `VITE_` to be accessible in Vite
- The application uses localStorage to persist authentication state
- All API calls go through the Axios instance in `services/api.js`
- Toast notifications appear for all major actions

## 👥 Team Members

- **Frontend Developer:** [Your Name]
- **Backend Developer:** [Teammate Name]

## 📄 License

This project is part of a lab assignment for educational purposes.

## 🤝 Support

For issues or questions, please contact your instructor or teaching assistant.

---

**Last Updated:** January 2026
