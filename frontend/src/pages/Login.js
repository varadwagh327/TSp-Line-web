import React, { useState, useContext, useEffect } from "react";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Context } from "../index.js";
import { HashLink } from "react-router-hash-link";
import { googleSignInSend } from "../services/auth";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  // ✅ Normal email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);

      // reset fields
      setEmail("");
      setPassword("");
      setRole("User");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // ✅ Google login handler
  useEffect(() => {
    // Google credential callback
    window.handleCredentialResponse = async (response) => {
      try {
        // Send token and role to backend
        const data = await googleSignInSend(response.credential, role);

        if (data?.accessToken && data?.user) {
          localStorage.setItem("googleAccessToken", data.accessToken);
          setUser(data.user);
          setIsAuthenticated(true);
          toast.success("Google login successful!");
          navigate("/");
        } else {
          toast.error("Google login failed.");
        }
      } catch (err) {
        console.error("Google login error:", err);
        toast.error("Google login failed!");
      }
    };

    // Load Google API script
    const scriptId = "google-client-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initGSI;
      document.body.appendChild(script);
    } else {
      initGSI();
    }

    function initGSI() {
      const container = document.getElementById("googleSignIn");
      const clientId =
        "920952709114-4oqpubk25650h2vcoc9mh9s9cke419fu.apps.googleusercontent.com";

      if (container && window.google?.accounts?.id?.initialize) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: window.handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(container, {
          theme: "outline",
          size: "large",
          width: "300",
        });
      }
    }

    return () => delete window.handleCredentialResponse;
  }, [navigate, role, setUser, setIsAuthenticated]);

  // ✅ Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
        <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
          <form onSubmit={handleLogin} id="loginProductForm">
            <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl mb-6">
                Login to our products
              </h1>

              <input
                name="email"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                name="password"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <select
                name="role"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>

              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="text-white bg-blue-900 hover:bg-blue-800 px-6 py-3 rounded-xl"
                >
                  Login
                </button>
                <HashLink to="/register" className="text-blue-500 underline">
                  Not registered? Register
                </HashLink>
              </div>

              {/* ✅ Google login button */}
              <div className="flex justify-center mt-6">
                <div id="googleSignIn"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
