import React, { useEffect, useContext } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
// All pages
import Home from './pages/Home.js';
import Contact from './pages/Contact.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ServicesAll from './pages/ServicesAll.js';
import ProductsAll from './pages/ProductsAll.js';
import AboutAll from "./pages/AboutAll.js"
import Messages from './components/Massage.js';
import MassageLogin from "./components/MassageLogin.js"

import ScrollToTop from './components/ScrollToTop.js';
import { Context } from './index.js';
import axios from 'axios';


function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);


  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/user/me",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
}, [isAuthenticated, setIsAuthenticated, setUser]);

  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/servicesAll" element={ isAuthenticated ? <ServicesAll /> : <Navigate to="/register" />} /> 
            <Route path="/productsAll" element={ isAuthenticated ? <ProductsAll /> : <Navigate to="/register" />} /> 
            <Route path="/messages" element={ isAuthenticated ? <Messages/> : <Navigate to="/massageLogin" />} /> 
            <Route path="/aboutAll" element={<AboutAll />} />
            <Route path="/massageLogin" element={<MassageLogin/>}/>
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}


export default App;
