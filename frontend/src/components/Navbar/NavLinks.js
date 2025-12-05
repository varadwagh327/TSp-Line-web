import React, { useContext } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { Context } from '../../index.js';
import axios from 'axios';
import toast from 'react-hot-toast';

const NavLinks = () => {
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      let logoutUrl = "";

      // Determine API route based on role
      const BASE_URL = process.env.REACT_APP_API_BASE || "https://tsp-line-web.onrender.com";
      if (user.role === "Admin") logoutUrl = `${BASE_URL}/api/v1/user/admin/logout`;
      else if (user.role === "Employee") logoutUrl = `${BASE_URL}/api/v1/user/employee/logout`;
      else logoutUrl = `${BASE_URL}/api/v1/user/user/logout`;

      const res = await axios.get(logoutUrl, { withCredentials: true });
      toast.success(res.data.message);
      // Clear client-side token storage and auth state
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("googleAccessToken");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (err) {
      // Even if server logout fails, clear client-side state so user appears logged out
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("googleAccessToken");
      // remove axios default Authorization header
      try { delete axios.defaults.headers.common["Authorization"]; } catch(e) {}
      setIsAuthenticated(false);
      navigateTo("/login");
      toast.error(err.response?.data?.message || "Logout failed!");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <HashLink smooth to="/#hero" className="px-4 font-extrabold text-gray-500 hover:text-blue-900">
        Home
      </HashLink>
      <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" smooth to="/#services">
        Services
      </HashLink>
      <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/#products">
        Products
      </HashLink>
      <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" to="/#contact">
        Contact Us
      </HashLink>
      <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900" smooth to="/#about">
        About
      </HashLink>

      {isAuthenticated ? (
        <button
          className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      ) : (
        <button
          className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl"
          onClick={goToLogin}
        >
          LOGIN
        </button>
      )}
    </>
  );
};

export default NavLinks;
