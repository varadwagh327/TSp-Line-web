import React, { useState, useContext } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import {  Navigate, useNavigate } from "react-router-dom";
import { Context } from '../index.js';
import {toast} from "react-hot-toast";
import { HashLink } from 'react-router-hash-link';

const Register = () => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')


    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    
    const navigateTo = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
          await axios
            .post(
              "http://localhost:4000/api/v1/user/user/register",
              { firstName, lastName, email, phone, password, role: "User" },
              {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((res) => {
              toast.success(res.data.message);
              setIsAuthenticated(true);
              navigateTo("/");
              setFirstName("");
              setLastName("");
              setEmail("");
              setPhone("");
              setPassword("");
            });
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
    
      if (isAuthenticated) {
        return <Navigate to={"/"} />;
      }
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='demo' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">
                    <form onSubmit={handleRegistration} id="demoProductForm">
                        <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                            <div className="flex">
                                <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Register our products</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <div>
                                    <input 
                                        name="first_name" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text" 
                                        placeholder="First Name*" 
                                        value={firstName}
                                        onChange={(e)=> setFirstName(e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <input 
                                        name="last_name" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="text" 
                                        placeholder="Last Name*"
                                        value={lastName}
                                        onChange={(e)=> setLastName(e.target.value)}
                                    />
                                    
                                </div>

                                <div>
                                    <input 
                                        name="email"
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="email" 
                                        placeholder="Email*"
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <input
                                        name="phone_number" 
                                        className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        type="number" 
                                        placeholder="Phone*"
                                        value={phone}
                                        onChange={(e)=> setPhone(e.target.value)}
                                    />
                                </div>
                        </div>
                        <div className="my-4">
                            <input 
                                name="password" 
                                placeholder="password*" 
                                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                type="number,text"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                                   {/* Button */}
            <div className="flex justify-around mt-6">
              <button className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl">
                Register
              </button>
              <p className="text-black dark:text-black">
                Not registered?{" "}
                <HashLink
                  to="/login"
                  className="underline text-blue-500 cursor-pointer"
                >
                  Login
                </HashLink>{" "}
              </p>
            </div>
                    </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>


    )
}

export default Register;