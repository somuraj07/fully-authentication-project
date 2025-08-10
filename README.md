<h1 align="center">🔐 Full Stack Authentication System</h1>
<p align="center">
  <b>Secure Authentication | MERN Stack (MongoDB, Express, React, Node.js)</b>  
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white" /></a>
  <a href="#"><img src="https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb&logoColor=white" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-Backend-000000?logo=express&logoColor=white" /></a>
  <a href="#"><img src="https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens" /></a>
</p>

---

## 📌 Overview

The **Full Stack Authentication System** is a secure, modern authentication solution built using the **MERN stack**.  
It offers a seamless sign-up, login, logout, and password reset experience while ensuring top-notch security with **JWT authentication** and **OTP-based verification**.

---

## 🚀 Features

- 👤 **User Authentication**
  - Sign Up / Login / Logout
  - Email verification via OTP
  - Password reset with email OTP

- 🔒 **Security**
  - JWT-based authentication
  - Protected API routes with middleware
  - CORS & cookie-based session handling

- 💾 **Database**
  - MongoDB integration for storing user credentials securely

- 🎨 **Frontend**
  - Clean React UI
  - API integration for real-time authentication status

- 🛠️ **Backend**
  - Node.js + Express server
  - Robust error handling & input validation

---

## 🛠️ Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| **Frontend** | React.js, Tailwind CSS (optional) |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth**     | JSON Web Token (JWT), OTP Email Verification |
| **Testing/API** | Postman API |
| **Deployment** | Any cloud hosting (Heroku, Render, etc.) |

---

## ⚡ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/somuraj07/fully-authentication-project.git
cd fully-authentication-project

# Install dependencies for backend
cd backend
npm install

# Install dependencies for frontend
cd ../frontend
npm install

# Setup environment variables (.env)
# Example:
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"
EMAIL_HOST="smtp.example.com"
EMAIL_PORT=587
EMAIL_USER="your_email@example.com"
EMAIL_PASS="your_password"

# Run backend
cd backend
npm start

# Run frontend
cd ../frontend
npm start
