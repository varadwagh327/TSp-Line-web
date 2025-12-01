import React from 'react';
import img from '../images/web.svg'; 
import img3 from '../images/hosting.svg';
import img4 from '../images/consultation.svg';
import { HashLink } from 'react-router-hash-link';

const Services = () => {
    const services = [
        {
            id: 1,
            title: "Web Development",
            image: img,
            description: "Custom web applications built with cutting-edge technologies to deliver exceptional user experiences."
        },
        {
            id: 2,
            title: "Domain and Hosting Services",
            image: img3,
            description: "Reliable domain registration and hosting solutions with 99.9% uptime guarantee and 24/7 support."
        },
        {
            id: 3,
            title: "General IT Consultations",
            image: img4,
            description: "Expert IT consulting to help optimize your technology infrastructure and digital transformation."
        }
    ];

    return (
        <section id="services" className="bg-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-900 uppercase mb-4">Our Services</h2>
                    <div className='flex justify-center mb-6'>
                        <div className='w-24 border-b-4 border-blue-900'></div>
                    </div>
                    <p className="text-xl lg:text-2xl font-semibold text-blue-900 max-w-4xl mx-auto leading-relaxed">
                        We are deeply committed to the growth and success of our clients
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {services.map((service, index) => (
                        <div 
                            key={service.id}
                            className="group bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-400 hover:shadow-2xl hover:bg-gray-500 hover:-translate-y-2"
                            data-aos="fade-up"
                            data-aos-delay={index * 150 + 300}
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-50 to-gray-100">
                                <img 
                                    alt={service.title} 
                                    className="w-full h-full object-contain p-8 transition-transform duration-1000 group-hover:scale-110" 
                                    src={service.image} 
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 text-center">
                                <h3 className="font-bold text-2xl text-gray-700 group-hover:text-white mb-4 transition-colors duration-300 min-h-[64px] flex items-center justify-center">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-600 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center" data-aos="fade-up" data-aos-delay="800">
                    <HashLink 
                        to="/servicesAll" 
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-900 hover:bg-blue-800 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group/btn"
                    >
                        Learn More About Our Services
                        <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </HashLink>
                </div>
            </div>
        </section>
    )
}

export default Services;