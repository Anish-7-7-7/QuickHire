import React, { useState } from "react";
import API from "../api/axios"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    title: "",
    location: "",
    bio: "",
    skills: "" // comma-separated string
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const sendData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim())
      };

      const res = await API.post("/api/v1/Signup", sendData);

      if (res.data.success) {
        alert("Signup successful");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "password", "title", "location", "bio", "skills"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field === "skills" ? "e.g. Node.js, Express, MongoDB" : ""}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required={["name", "email", "password"].includes(field)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
