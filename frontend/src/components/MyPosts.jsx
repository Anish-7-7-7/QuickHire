import React, { useEffect, useState } from "react";
import API from "../api/axios";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    API.get("/api/v1/myposts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .then(res => setPosts(res.data.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await API.delete(`/api/v1/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      fetchPosts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">My Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="mb-5 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.description}</p>
          <button
            onClick={() => handleDelete(post._id)}
            className="mt-2 text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
