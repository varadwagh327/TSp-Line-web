import React from "react";
import "../index.js";
import NavBar from "./Navbar/NavBar.js";
import Footer from "./Footer.js";
import img from '../images/web.svg'; 
import img3 from '../images/hosting.svg';
import img4 from '../images/consultation.svg';


function MyService() {
  return (
    <>
     <div>
        <NavBar/>
     </div>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
        <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">services</h2>
        <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">We are deeply committed to the growth and success of our clients.</h2>
                 
          <div className="space-y-8">
            <p className="text-red-500 text-2xl md:text-4xl font-bold">Web Development</p>
            <p className="text-sm md:text-xl">
            Our web development services provide end-to-end solutions for creating custom, dynamic, and responsive websites. From concept to launch, we focus on building user-friendly sites that align with your brand and business goals. Whether you need a simple website, an e-commerce platform, or a complex web application, our team is equipped with the latest technologies to bring your vision to life.
            </p>
           </div> 
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={img}
            className="md:w-[550px] md:h-[460px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
      </div>
      <hr/>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={img3}
            className="md:w-[550px] md:h-[460px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
             <div className="space-y-8">
            <p className="text-red-500 text-2xl md:text-4xl font-bold">Domain and Hosting Services</p>
            <p className="text-sm md:text-xl">
            We provide comprehensive domain and hosting solutions tailored to support your online presence. From securing the perfect domain name to reliable, high-performance hosting, our services ensure your website is always accessible and performs optimally. With our expert support, setting up, managing, and scaling your site is simple and secure, giving you the foundation needed for growth.
            </p>
           </div> 
        </div>
      </div>
      <hr/>
      <div className=" background1 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">          
          <div className="space-y-8">
            <p className="text-red-500 text-2xl md:text-4xl font-bold">General IT Consultations</p>
            <p className="text-sm md:text-xl">
            Our IT consultation services provide expert guidance across all your technology needs. We help businesses and individuals navigate IT challenges, from software solutions to infrastructure improvements, ensuring you have the right tools to meet your goals. Whether you’re looking to enhance cybersecurity, optimize systems, or explore new technologies, our team is here to advise and support every step of the way.</p>
           </div> 
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={img4}
            className="md:w-[550px] md:h-[460px] md:ml-12 rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out"
            alt=""
          />
        </div>
      </div>
      <hr/>
        <div className="my-4 py-4">
                        <h2 className="my-2 text-center text-3xl text-blue-900 font-bold">Web Development with Custom Functionality</h2>
                        
                        <div className='flex justify-center'>
                            <div className='w-24 border-b-4 border-blue-900'></div>
                        </div>
                        <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">Our web development services are tailored to meet your unique needs, offering fully customized solutions to ensure your website functions exactly as you envision. From specialized features to custom workflows, we design and build sites that reflect your business goals and enhance user experience. Whether you need a basic site or a complex application, we’re here to bring your ideas to life with precision and expertise.</h2>
                    </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}

export default MyService;
