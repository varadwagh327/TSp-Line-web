import React from 'react';
import { Link } from 'react-router-dom';
import imgDoctor from "../images/clients/hospitaldoctor.jpg";
import imgItBooks from "../images/clients/itbooks.jpg";
import imgPortfolio from "../images/clients/portfolio.jpg";
import imgCNG from "../images/clients/CNG.png";

const Products = () => {
    const products = [
        {
            id: 1,
            title: "CNG Workers Management System",
            image: imgCNG,
            description: "Complete workforce management solution for CNG operations with real-time tracking and analytics."
        },
        {
            id: 2,
            title: "IT-Books Management System",
            image: imgItBooks,
            description: "Digital library management system with advanced search, categorization, and user management features."
        },
        {
            id: 3,
            title: "Doctor-Appointment System",
            image: imgDoctor,
            description: "Streamlined healthcare appointment scheduling with patient management and automated reminders."
        },
        {
            id: 4,
            title: "Portfolio Website",
            image: imgPortfolio,
            description: "Professional portfolio platform to showcase your work with modern design and responsive layout."
        }
    ];

    return (
        <>
            <section className="py-20 bg-white" id='products'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 uppercase mb-4">Our Products</h2>
                        <div className='flex justify-center mb-6'>
                            <div className='w-24 border-b-4 border-blue-900'></div>
                        </div>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Innovative solutions designed to streamline your business operations and enhance productivity
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="200">                            
                        {products.map((product, index) => (
                            <div 
                                key={product.id} 
                                className="group bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-400 hover:shadow-2xl hover:-translate-y-2"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden h-56">
                                    <img 
                                        alt={product.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        src={product.image} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col h-64">
                                    <h4 className="font-bold text-xl text-gray-800 mb-3 leading-tight min-h-[56px] flex items-center">
                                        {product.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                                        {product.description}
                                    </p>
                                    
                                    {/* Button */}
                                    <Link 
                                        to="/productsAll" 
                                        className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl group/btn"
                                    >
                                        View All Products
                                        <svg className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products;