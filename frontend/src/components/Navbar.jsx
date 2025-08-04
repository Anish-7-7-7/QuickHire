import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 shadow-xl rounded-b-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white tracking-wide">
            QuickHire
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8 text-sm items-center">
            <li>
              <Link
                to="/"
                className="text-gray-300 font-semibold px-3 py-2 rounded-lg 
                  hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/createposts"
                className="text-gray-300 font-semibold px-3 py-2 rounded-lg 
                  hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Post
              </Link>
            </li>

              <li>
              <Link
                to="/contact"
                className="text-gray-300 font-semibold px-3 py-2 rounded-lg 
                  hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Contact Us
              </Link>
            </li>

            {token ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-300 font-semibold px-3 py-2 rounded-lg 
                      hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    Profile
                  </Link>
                </li>
                <li className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 font-semibold px-3 py-2 rounded-lg 
                      hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-300 font-semibold px-3 py-2 rounded-lg 
                      hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-gray-300 font-semibold px-3 py-2 rounded-lg 
                      hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
