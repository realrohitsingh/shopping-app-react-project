# 🚀 SmartShop Setup Instructions

## 📋 Prerequisites

- Node.js installed on your system
- npm package manager

## 🛠️ Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Product Management Server

```bash
npm run server
```

This will start the Express server on `http://localhost:1002` that handles reading/writing to `products.json`

### 3. Start the React Development Server (in a new terminal)

```bash
npm run dev
```

This will start the Vite development server on `http://localhost:5173`

### 4. OR Run Both Servers Together

```bash
npm run dev:full
```

This runs both the product server and React dev server simultaneously.

## ✅ How It Works Now

### **Product Management Flow:**

1. **Server reads** from `src/database/products.json`
2. **You add/edit/delete** products through the web interface
3. **Server writes** changes back to `products.json`
4. **Changes are permanent** and visible in the JSON file
5. **Web interface** always shows the latest data from the JSON file

### **What Happens When You:**

- **Add Product**: ✅ Saved to `products.json` file
- **Edit Product**: ✅ Updated in `products.json` file
- **Delete Product**: ✅ Removed from `products.json` file
- **Refresh Page**: ✅ Shows latest data from `products.json`

## 🔧 Server Endpoints

The product server provides these endpoints:

- `GET /products` - Get all products
- `POST /products` - Add new product
- `PUT /products/:id` - Update existing product
- `DELETE /products/:id` - Delete product

## 📁 File Structure

```
shopping project/
├── server.js                    # Express server for product management
├── package.json                 # Dependencies and scripts
├── src/
│   ├── database/
│   │   └── products.json        # Your product data (gets updated!)
│   └── components/
│       ├── ManageProducts.jsx   # Product management interface
│       └── AdminHomePage.jsx    # Admin dashboard
└── SETUP_INSTRUCTIONS.md        # This file
```

## 🎯 Testing the System

1. **Start both servers** (`npm run dev:full`)
2. **Open** `http://localhost:5173`
3. **Login** as admin
4. **Go to** Manage Products
5. **Add a new product**
6. **Check** `src/database/products.json` - your new product should be there!
7. **Refresh** the page - your new product should still be visible

## 🚨 Important Notes

- **Always keep the server running** while using the product management features
- **The JSON file is updated in real-time** when you make changes
- **Both servers must be running** for full functionality
- **Changes are permanent** and survive browser refreshes

## 🆘 Troubleshooting

**If products don't save:**

- Make sure the server is running (`npm run server`)
- Check console for any error messages
- Verify the server is accessible at `http://localhost:1002`

**If you see "Failed to fetch products":**

- Start the product server first
- Then start the React dev server

## 🎉 You're All Set!

Your SmartShop now has a complete product management system that:

- ✅ Reads from `products.json`
- ✅ Writes to `products.json`
- ✅ Shows real-time updates on the webpage
- ✅ Persists all changes permanently
