# 🛒 SmartShop - E-commerce Admin Dashboard

A modern, responsive e-commerce admin dashboard built with React, Vite, and Tailwind CSS. This application provides a complete product management system with authentication, routing, and real-time updates.

## ✨ Features

### 🔐 Authentication System

- **Admin Authentication**: Login, Signup, and Forgot Password
- **User Authentication**: Login, Signup, and Forgot Password
- **Persistent Registration**: New users are saved to localStorage and can login immediately
- **Secure Session Management**: Automatic redirects for unauthenticated users

### 📊 Admin Dashboard

- **Dynamic Statistics**: Real-time product count updates
- **Modern UI**: Beautiful gradient backgrounds and glassmorphism effects
- **Responsive Design**: Works perfectly on all device sizes
- **Quick Navigation**: Easy access to product management

### 🛍️ Product Management

- **CRUD Operations**: Create, Read, Update, Delete products
- **Image Management**: Support for product images with fallback handling
- **Category Organization**: Electronics, Men's Clothing, and more
- **Stock Tracking**: Inventory management with stock levels
- **Auto-scroll**: Edit button automatically scrolls to product form
- **Enhanced Image Visibility**: Large, clear product images with loading states

### 🎨 UI/UX Features

- **Toast Notifications**: Success/error messages for all operations
- **Loading States**: Spinners and loading indicators
- **Image Fallbacks**: Graceful handling of missing images
- **Smooth Animations**: Hover effects and transitions
- **Modern Styling**: Gradient backgrounds, shadows, and glassmorphism

### 🔄 Real-time Updates

- **Dynamic Product Count**: Admin dashboard updates automatically
- **Event-driven Architecture**: Components communicate via custom events
- **Persistent Storage**: All changes saved to JSON database

## 🚀 Tech Stack

- **Frontend**: React 19.1.1, Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.13
- **Routing**: React Router DOM 7.9.2
- **Icons**: React Icons 5.5.0
- **HTTP Client**: Axios 1.12.2
- **Notifications**: React Toastify 11.0.5
- **Database**: JSON Server 1.0.0-beta.3
- **Development**: ESLint, PostCSS, Autoprefixer

## 📁 Project Structure

```
smartshop/
├── src/
│   ├── components/
│   │   ├── AdminHomePage.jsx      # Main admin dashboard
│   │   ├── ManageProducts.jsx     # Product management interface
│   │   ├── AdminLogin.jsx         # Admin authentication
│   │   ├── AdminSign.jsx          # Admin registration
│   │   ├── AdminForgotPass.jsx    # Admin password reset
│   │   ├── UserLogin.jsx          # User authentication
│   │   ├── UserSign.jsx           # User registration
│   │   └── UserForgotPass.jsx     # User password reset
│   ├── database/
│   │   ├── products.json          # Product database
│   │   ├── admin.json             # Admin credentials
│   │   └── user.json              # User credentials
│   └── App.jsx                    # Main application component
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd smartshop
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start JSON Server

In one terminal, start the JSON server for the database:

```bash
npx json-server src/database/products.json --port 1002
```

### 4. Start Development Server

In another terminal, start the React development server:

```bash
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **JSON Server API**: http://localhost:1002/products

## 📋 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔑 Default Credentials

### Admin Accounts

- **Email**: `admin@gmail.com`
- **Password**: `admin123`

### User Accounts

- **Email**: `user@gmail.com`
- **Password**: `user123`

## 🎯 Usage Guide

### 1. Admin Login

1. Navigate to `/admin-login`
2. Use admin credentials to login
3. Access the admin dashboard

### 2. Product Management

1. Click "Manage Products" on the dashboard
2. View all existing products
3. **Add Product**: Click "Add New Product" button
4. **Edit Product**: Click edit icon on any product (auto-scrolls to form)
5. **Delete Product**: Click delete icon and confirm

### 3. User Registration & Login

1. Navigate to `/user-sign` to create new user account
2. Navigate to `/user-login` to login with existing account
3. New registrations are automatically saved and loginable

## 🗄️ Database Schema

### Products

```json
{
  "id": "unique_id",
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description",
  "category": "Electronics|Men's Clothing|...",
  "stock": 10,
  "image": "image_url"
}
```

### Admin/User

```json
{
  "id": "unique_id",
  "name": "Full Name",
  "email": "email@example.com",
  "password": "hashed_password"
}
```

## 🎨 UI Components

### Dashboard Statistics

- **Products**: Dynamic count from database
- **Orders**: Placeholder (No Orders)
- **Revenue**: Placeholder (No Revenue)
- **Customers**: Placeholder (N/A)

### Product Cards

- Large, clear product images (320px height)
- Gradient backgrounds with glassmorphism
- Hover effects and smooth transitions
- Loading states and fallback images

### Forms

- Modern input styling with focus states
- Real-time validation
- Success/error toast notifications
- Auto-scroll to form on edit

## 🔧 Configuration

### API Endpoints

- `GET /products` - Fetch all products
- `POST /products` - Add new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Environment Variables

No environment variables required. All configuration is handled through the JSON database files.

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy

The `dist` folder contains the production build that can be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

1. **JSON Server not starting**

   - Ensure port 1002 is available
   - Check if `src/database/products.json` exists

2. **Products not loading**

   - Verify JSON server is running on port 1002
   - Check browser console for API errors

3. **Authentication issues**

   - Clear localStorage and try again
   - Verify credentials in `admin.json` and `user.json`

4. **Images not displaying**
   - Check image URLs in products.json
   - Ensure images are accessible from the internet

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
