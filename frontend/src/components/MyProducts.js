import React, { useContext, useEffect, useState } from "react";
import Cards from "./cards.js";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../index.js";

function MyProducts() {
  const [product, setProduct] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/product/getall",
          { withCredentials: true }
        );
        setProduct(data.product);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 items-center justify-center text-center">
        <h1 className="text-2xl md:text-4xl">
          We're delighted to have you{" "}
          <span className="text-blue-900">Here! :</span>
        </h1>
        <p className="mt-12">
          Programming is not just a skill but a journey of growth, creativity, and impact...
        </p>
        <Link to="/">
          <button className="mt-6 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-500 duration-300">
            Back
          </button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
      {product.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default MyProducts;
