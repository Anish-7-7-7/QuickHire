import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { CalendarDays, UserCircle2 } from "lucide-react";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/api/v1/getpost")
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
        QuickHire Feed
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4 line-clamp-3">{post.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-2">
                <UserCircle2 className="w-5 h-5 text-blue-500" />
                <span>{post.user?.name || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
