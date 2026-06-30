# 🛒 Ecommerce Backend API

A RESTful Ecommerce Backend API built using **Node.js**, **Express.js**, and **MySQL**. This project provides authentication, product management, shopping cart, order management, reviews, and category management with secure JWT authentication and transaction-based order processing.

---

# 🚀 Features

### Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Role-Based Authorization (Admin/User)

### Product Management
- Create Product
- Update Product
- Delete Product
- Get Product by ID
- Get All Products
- Product Search
- Product Pagination
- Product Sorting
- Product Category Filter

### Category Management
- Create Category
- Get Products by Category

### Shopping Cart
- Add to Cart
- View Cart
- Remove Cart Item
- Clear Cart

### Orders
- Create Order
- Get Orders
- Get Order Details
- Update Order Status
- MySQL Transactions
- Stock Validation
- Automatic Stock Reduction

### Reviews
- Add Product Review
- Get Reviews by Product

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- Joi Validation
- MySQL2
- Dotenv

---

# 📁 Project Structure

```
controllers/
middleware/
routes/
services/
validators/

app.js
server.js
db.js
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-backend.git
```

Go to the project

```bash
cd ecommerce-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
MYSQLHOST=
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
MYSQLPORT=
JWT_SECRET=
PORT=5000
```

Run the server

```bash
npm run dev
```

---

# 🔑 API Endpoints

## Authentication

POST `/auth/register`

POST `/auth/login`

---

## Products

GET `/products`

GET `/products/:id`

POST `/products`

PATCH `/products/:id`

DELETE `/products/:id`

---

## Categories

POST `/categories`

---

## Cart

POST `/api/cart`

GET `/api/cart`

DELETE `/api/cart/:id`

DELETE `/api/cart`

---

## Orders

POST `/orders`

GET `/orders`

GET `/orders/details`

PUT `/orders/:id/status`

---

## Reviews

POST `/reviews`

GET `/reviews/product/:id`

---

# 🔒 Authentication

Protected routes require a JWT token.

```
Authorization: Bearer <your_token>
```

---

# 📌 Database

Main Tables

- users
- products
- categories
- carts
- orders
- order_items
- reviews

---

# ✨ Key Features

- MVC Architecture
- Service Layer Pattern
- Middleware-based Authentication
- Role-based Authorization
- Input Validation
- Global Error Handling
- MySQL Transactions
- Stock Management
- Secure Password Hashing
- RESTful APIs

---

# 📈 Future Improvements

- Payment Gateway Integration
- Wishlist
- Image Upload
- Order History
- Refresh Token Authentication
- Swagger API Documentation
- Docker Support

---

# 👨‍💻 Author

**Nitin Khatri**

Backend Developer | Node.js | Express.js | MySQL
