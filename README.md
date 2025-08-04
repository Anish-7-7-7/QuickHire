🚀 QuickHire — MERN Social Platform

QuickHire is a lightweight, full-stack social platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can sign up, log in, create posts, view others' posts, and manage their profile. It's designed to serve as a professional networking base, perfect for job seekers, recruiters, and developers.


🔧 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Auth:** JWT-based Authentication, Protected Routes
- **Design:** TailwindCSS with responsive layouts

---

🔑 Features

✅ User Signup & Login  
✅ JWT-based Authentication  
✅ Create & View Posts  
✅ Personal Profile Page  
✅ Delete Own Posts  
✅ Responsive Navbar & Footer  
✅ Clean UI with Tailwind CSS  
✅ Protected Routes (Profile, CreatePost)  
✅ Logout Functionality  

---

## 📁 Project Structure

📦 Frontend
┣ 📂 src
┃ ┣ 📂 components # Navbar, Footer, etc.
┃ ┣ 📂 pages # Home, Profile, CreatePost, etc.
┃ ┣ 📂 api # Axios config
┃ ┗ App.jsx
📦 backend
┣ 📂 controllers # postController, userController
┣ 📂 models # User.js, Post.js
┣ 📂 routes # userRoutes.js, postRoutes.js
┣ index.js
┣ .env

📦Setup Backend
cd server
npm install

📦add .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

📦Setup Frontend
cd client
npm install
npm run dev
