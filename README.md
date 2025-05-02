# 💬 Real-Time Chat App

This is a Real-Time Chat Application built using **Next.js**, **Socket.IO**, and **MongoDB**. It allows users to register, login, and chat instantly with others in a simple, chatGPT-like interface.

## 🚀 Features

- 🔐 User Registration & Login
- 💬 Real-time messaging using Socket.IO
- 📦 MongoDB stores messages persistently
- ⚡ Modern Next.js frontend with Tailwind CSS

## 🛠️ Getting Started

1. Clone the repo  
   ```bash
   git clone https://github.com/codemy3/PRODIGY_FS_04.git
   cd PRODIGY_FS_04
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Add `.env.local`  
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server  
   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser.

## 📂 Project Structure

- `/pages` - Next.js routes (login, register, chat)
- `/backend` - DB models and socket handler
- `/utils` - MongoDB connection utility
- `/public` - Static files

