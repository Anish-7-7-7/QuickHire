import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { UserCircle } from "lucide-react"; 
import MyPosts from "../components/MyPosts";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/v1/getprofile");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-20 text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <UserCircle className="w-12 h-12 text-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-600">{user.title}</p>
          <p className="text-sm text-gray-500">{user.location}</p>
        </div>
      </div>

      {user.bio && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Bio</h2>
          <p className="text-gray-600 text-sm">{user.bio}</p>
        </div>
      )}

      {user.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
          <ul className="flex flex-wrap gap-3">
            {user.skills.map((skill, index) => (
              <li
                key={index}
                className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-sm hover:bg-blue-700 transition"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">My Posts</h2>
        <MyPosts />
      </div>
    </div>
  );
};

export default Profile;
