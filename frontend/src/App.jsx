import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./components/CreatePost";
import AllPosts from "./pages/AllPosts";
import MyPosts from "./components/MyPosts";      

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createposts" element={<CreatePost />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="/myposts" element={<MyPosts />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

