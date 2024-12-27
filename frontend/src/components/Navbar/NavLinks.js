import React, { useContext } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { Context } from '../../index.js';
import axios from 'axios';
import toast from 'react-hot-toast';

const NavLinks = () => {
  
   
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  
  const navigateTo = useNavigate();

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
            <button className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </>
    )
}

export default NavLinks;
