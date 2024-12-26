import React from 'react';
import MyProducts from "../components/MyProducts.js";
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';

const ProductsAll = () => {
    return ( 
     <>
     <NavBar/>
     <div className=" min-h-screen">
     <MyProducts/>
     </div>
     <Footer/>
     </>
     );
}
 
export default ProductsAll;