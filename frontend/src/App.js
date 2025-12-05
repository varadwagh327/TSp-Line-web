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

  // ✅ Fetch user from either stored accessToken (localStorage/sessionStorage) or cookies on app load
  useEffect(() => {
    const fetchUser = async () => {
      // 0️⃣ Try accessToken from localStorage/sessionStorage first
      const storedToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      if (storedToken) {
        try {
          const tokenRes = await axios.get(
            `${process.env.REACT_APP_API_BASE || "https://tsp-line-web.onrender.com"}/api/v1/user/user/me`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
              withCredentials: true,
              timeout: 5000,
            }
          );

          if (tokenRes?.data?.user) {
            setIsAuthenticated(true);
            setUser(tokenRes.data.user);
            return;
          }
        } catch (err) {
          // token from storage failed - clear it and continue to cookie check
          localStorage.removeItem("accessToken");
          sessionStorage.removeItem("accessToken");
        }
      }

      try {
        // 1️⃣ Try cookie-based login (backend cookie)
        const normalRes = await axios.get(
          `${process.env.REACT_APP_API_BASE || "https://tsp-line-web.onrender.com"}/api/v1/user/user/me`,
          {
            withCredentials: true,
            timeout: 5000,
          }
        );

        if (normalRes?.data?.user) {
          setIsAuthenticated(true);
          setUser(normalRes.data.user);
          return;
        }
      } catch (error) {
        // continue to google check
      }

      try {
        // 2️⃣ Try Google login using stored googleAccessToken
        const token = localStorage.getItem("googleAccessToken");
        if (!token) {
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
