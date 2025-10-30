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
      if (user.role === "Admin") logoutUrl = "http://localhost:4000/api/v1/user/admin/logout";
      else if (user.role === "Employee") logoutUrl = "http://localhost:4000/api/v1/user/employee/logout";
      else logoutUrl = "http://localhost:4000/api/v1/user/user/logout";

      const res = await axios.get(logoutUrl, { withCredentials: true });
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (err) {
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
