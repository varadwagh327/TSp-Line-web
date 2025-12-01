import React, { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ✅ Pages
import Home from "./pages/Home.js";
import Contact from "./pages/Contact.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import ServicesAll from "./pages/ServicesAll.js";
import ProductsAll from "./pages/ProductsAll.js";
import AboutAll from "./pages/AboutAll.js";
import Email from "./pages/Email.js";
import Messages from "./components/Massage.js";
import MassageLogin from "./components/MassageLogin.js";
import LoginEmail from "./components/LoginEmail.js";

import ScrollToTop from "./components/ScrollToTop.js";
import { Context } from "./index.js";
import axios from "axios";

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: "ease-out-cubic",
      });
    };
    window.addEventListener("load", aos_init);
    return () => window.removeEventListener("load", aos_init);
  }, []);

  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  // ✅ Fetch user from either normal login or Google login on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1️⃣ Try normal login first (uses cookie set by backend)
        const normalRes = await axios.get(
          `${process.env.REACT_APP_API_BASE || "https://tsp-line-web.onrender.com"}/api/v1/user/user/me`,
          { 
            withCredentials: true,
            timeout: 5000 // 5 second timeout
          }
        );

        if (normalRes?.data?.user) {
          setIsAuthenticated(true);
          setUser(normalRes.data.user);
          return; // ✅ Stop here if normal user found
        }
      } catch (error) {
        // Silently continue - user is not authenticated via normal login
        // This is expected behavior on first page load
      }

      try {
        // 2️⃣ Try Google login
        const token = localStorage.getItem("googleAccessToken");
        if (!token) {
          // No Google token either - user is not authenticated
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        const googleRes = await axios.get(
          `${process.env.REACT_APP_API_BASE || "https://tsp-line-web.onrender.com"}/api/user/googleLogin/google/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            timeout: 5000,
          }
        );

        if (googleRes?.data?.user) {
          setIsAuthenticated(true);
          setUser(googleRes.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        // Google auth also failed - user is not authenticated
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();
  }, [setIsAuthenticated, setUser]);

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutAll" element={<AboutAll />} />
          <Route path="/massageLogin" element={<MassageLogin />} />
          <Route path="/loginEmail" element={<LoginEmail />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/servicesAll"
            element={
              isAuthenticated ? <ServicesAll /> : <Navigate to="/register" />
            }
          />
          <Route
            path="/productsAll"
            element={
              isAuthenticated ? <ProductsAll /> : <Navigate to="/register" />
            }
          />
          <Route
            path="/messages"
            element={
              isAuthenticated ? <Messages /> : <Navigate to="/massageLogin" />
            }
          />
          <Route
            path="/email"
            element={isAuthenticated ? <Email /> : <Navigate to="/login" />}
          />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
