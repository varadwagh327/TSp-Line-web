import React from "react";
import NavBar from "./Navbar/NavBar";
import Footer from "./Footer";
import img2 from "../images/clients/logo2.png";
import aditya from "../images/clients/aditya.png";
import omkar from "../images/clients/omkar.png";
import sushant from "../images/clients/sushant.png";
import varad from "../images/clients/varad.png";
import rohan from "../images/clients/rohan.png";
import sanket from "../images/clients/sanket.png";
import mayur from "../images/clients/mayur.png";
import { HashLink } from "react-router-hash-link";



export default function AboutPage() {
  
  return (
   <>
   <div>
    <NavBar/>
   </div>
    <main className="flex-grow">
    <section className="py-24 bg-gradient-to-b from-primary to-background text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-900">About Us</h2>
        <p className="text-xl max-w-2xl mx-auto">
        Welcome to Our Trusted Simple Line Team. We are a passionate team dedicated to creating innovative solutions that make a difference in people's lives.
        </p>
      </div>
    </section>

    <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row">
        
        <div className=" order-1 w-full md:w-1/2">
          <img
            src={img2}
            className="md:w-[400px] md:h-[400px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt="TSp-Line"
          />
        </div>
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-10 md:mt-15">
             <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Trusted Simple Line</p>
            <p className="text-sm md:text-xl">
            At Trusted Simple Line, we provide reliable, straightforward IT solutions tailored to meet your business needs. Our mission is to simplify technology, delivering secure and efficient services you can trust—from expert consultations to complete web development and hosting. We focus on making tech easy, helping your business succeed online with confidence.</p>
           </div> 
        </div>
      </div>

      <section className="py-20 bg-gradient-to-b from-primary to-background text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl text-blue-900 font-bold mb-6">Our Mission</h2>
        <p className="text-xl max-w-2xl mx-auto">
        Our mission is to empower businesses and individuals with technology that enhances productivity, fosters creativity, and drives growth. We believe in the power of innovation to solve complex problems and create a better future for all. </p>
      </div>
    </section>
    </main>
    

    <section className="py-20 bg-gradient-to-b from-primary to-background text-primary-foreground">
    <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row">
    
    <div className="container mx-auto px-4 text-center">
    <p className="text-4xl text-blue-900 font-bold mb-6">Our Team</p>
    <div className="w-full order-2 md:order-1 md:w-1/2 mt-10 md:mt-15 ">
             <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Marketing Team</p>
            <p className="text-sm md:text-xl">1.Aditya Kakade = Marketing Head</p>
            <p className="text-sm md:text-xl">2.Omkar Pande = Media Head</p>
            <p className="text-sm md:text-xl">3.Sushant Bhor = Event/Cultural Head</p>
        </div> 
        </div>
    </div>
    <div className="w-full order-2 md:order-1 md:w-1/2 mt-10 md:mt-15 ">
             <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Development Team</p>
            <p className="text-sm md:text-xl">1.Varad Wagh = Back-End Development</p>
            <p className="text-sm md:text-xl">2.Rohan Gaikwad = Front-End Development</p>
            <p className="text-sm md:text-xl">3.Sanket Dere = Testing & Debugging</p>
            <p className="text-sm md:text-xl">4.Mayur Kanhore = Client Communication</p>
             </div> 
        </div>
         </div>
    </section>


    <hr/>
    <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={aditya}
            className="md:w-[400px] md:h-[400px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
             <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Aditya Kakade = Marketing Head</p>
            <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us:</h2>
                        <p className="text-gray-400 text-xl">Tel: 9975397011</p>
                        
                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail:</h2>
                                <p className="text-gray-400 text-xl">adukakade03@gmail.com</p>
                            </div>

                            <div className='mt-5'>
                            <h2 className="text-2xl">Education:</h2>
                            <p className="text-sm md:text-xl">Bachelor degree in Marketing, Business Administration, Communications.</p>
                            </div>
                       
                        </div>
           </div> 
        </div>
      </div>
      <hr/>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">          
          <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Omkar Pande = Media Head</p>
            <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us:</h2>
                        <p className="text-gray-400 text-xl">Tel:  8624963808</p>
                        
                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail:</h2>
                                <p className="text-gray-400 text-xl">omkarpande077@gmail.com</p>
                            </div>

                            <div className='mt-5'>
                            <h2 className="text-2xl">Education:</h2>
                            <p className="text-sm md:text-xl">Bachelor degree in Marketing, Business Administration, Communications.</p>
                            </div>
                       
                        </div>
                         </div> 
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={omkar}
            className="md:w-[400px] md:h-[400px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
      </div>
    


      <hr/>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={sushant}
            className="md:w-[400px] md:h-[400px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
             <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Sushant Bhor = Event/Cultural Head</p>
            <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us:</h2>
                        <p className="text-gray-400 text-xl">Tel: 9356626609</p>
                        
                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail:</h2>
                                <p className="text-gray-400 text-xl">sushantbhor03@gmail.com</p>
                            </div>

                            <div className='mt-5'>
                            <h2 className="text-2xl">Education:</h2>
                            <p className="text-sm md:text-xl">Bachelor degree in Marketing, Business Administration, Communications.</p>
                            </div>
                       
                        </div>
           </div> 
        </div>
      </div>
      <hr/>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">          
          <div className="space-y-8">

             <p className="text-blue-900 text-2xl md:text-4xl font-bold"> <HashLink smooth to="/massageLogin">Varad Wagh</HashLink> = Back-End Development</p>
            <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us:</h2>
                        <p className="text-gray-400 text-xl">Tel: 8421893853</p>
                        
                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail:</h2>
                                <p className="text-gray-400 text-xl">varadwagh326@gmail.com</p>
                            </div>
                            
                            <div className='mt-5'>
                            <h2 className="text-2xl">Education:</h2>
                            <p className="text-sm md:text-xl">Bachelor degree in Computer Science, Proficiency with Node.js and Express.js to create server-side logic, handle API requests, and connect the front end with back-end services.</p>
                            </div>
                       
                        </div>
                          </div> 
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={varad}
            className="md:w-[400px] md:h-[400px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
      </div>
      


      <hr/>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={rohan}
            className="md:w-[400px] md:h-[400px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
             <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Rohan Gaikwad = Front-End Development</p>
            <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us:</h2>
                        <p className="text-gray-400 text-xl">Tel: 8010385661 </p>
                        
                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail:</h2>
                                <p className="text-gray-400 text-xl">gairohan0@gmail.com</p>
                            </div>

                            <div className='mt-5'>
                            <h2 className="text-2xl">Education:</h2>
                            <p className="text-sm md:text-xl">Bachelor degree in Computer Science, Advanced knowledge of React.js for building dynamic user interfaces, along with experience in front-end styling frameworks (e.g., Bootstrap, Tailwind CSS).</p>
                            </div>
                       
                        </div>
           </div> 
        </div>
      </div>
      <hr/>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">          
          <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Sanket Dere = Testing & Debugging</p>
            <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us:</h2>
                        <p className="text-gray-400 text-xl">Tel: 7588663201</p>
                        
                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail:</h2>
                                <p className="text-gray-400 text-xl">sanketdere1112@gmail.com</p>
                            </div>

                            <div className='mt-5'>
                            <h2 className="text-2xl">Education:</h2>
                            <p className="text-sm md:text-xl">Bachelor degree in Computer Science, Information Technology, Software Engineering.</p>
                            </div>
                       
                        </div>
                          </div> 
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={sanket}
            className="md:w-[400px] md:h-[400px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
      </div>
      <hr/>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={mayur}
            className="md:w-[400px] md:h-[400px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
             <div className="space-y-8">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold">Mayur Kanhore = Client Communication</p>
            <div className="flex flex-col">
                        <h2 className="text-2xl">Call Us:</h2>
                        <p className="text-gray-400 text-xl">Tel: 9075759446</p>
                        
                            <div className='mt-5'>
                                <h2 className="text-2xl">Send an E-mail:</h2>
                                <p className="text-gray-400 text-xl">kanhoremayur@gmail.com</p>
                            </div>

                            <div className='mt-5'>
                            <h2 className="text-2xl">Education:</h2>
                            <p className="text-sm md:text-xl">Bachelor degree in Business, Marketing, Communications. Information Technology can be advantageous, as it provides a foundation for both technical and interpersonal skills.</p>
                            </div>
                       </div>
                        </div> 
        </div>
      </div>
     <div>
      <Footer/>
    </div>
   </>
  )
}