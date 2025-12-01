import React from 'react';
import MyProducts from "../components/MyProducts.js";
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const ProductsAll = () => {
    return ( 
     <>
     <NavBar/>
     <MyProducts/>
     <Footer/>
     </>
     );
}
 
export default ProductsAll;