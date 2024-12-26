import React from 'react';
import About from '../components/About';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import MyContact from '../components/MyContact';
import Products from '../components/Products';
import Services from '../components/Services';


const Home = () => {
    return (
        <>
            <Hero />
            <Services />
            <Products />
            <MyContact />
            <About/>
            <Footer />
        </>

    )
}

export default Home;

