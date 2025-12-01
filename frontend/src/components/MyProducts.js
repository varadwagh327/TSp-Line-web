import React, { useContext, useEffect, useState } from "react";
import Cards from "./cards.js";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../index.js";

function MyProducts() {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/product/getall",
          { withCredentials: true }
        );
        setProduct(data.product);
        setFilteredProducts(data.product);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...product];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Sorting
    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name?.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name?.localeCompare(a.name));
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, product]);

  // Get unique categories
  const categories = ["All", ...new Set(product.map((item) => item.category).filter(Boolean))];

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 px-4">
        <div className="max-w-screen-2xl container mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Our <span className="text-blue-300">Products</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of premium products designed to elevate your experience
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/">
                <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  ← Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:outline-none dark:bg-slate-700 dark:text-white transition-all"
              />
              <svg className="w-5 h-5 absolute left-4 top-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:outline-none dark:bg-slate-700 dark:text-white appearance-none cursor-pointer transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <svg className="w-5 h-5 absolute right-4 top-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:outline-none dark:bg-slate-700 dark:text-white appearance-none cursor-pointer transition-all"
              >
                <option value="default">Sort By: Default</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <svg className="w-5 h-5 absolute right-4 top-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== "All" || sortBy !== "default") && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Filters:</span>
              {searchTerm && (
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-blue-600">
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== "All" && (
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} className="hover:text-green-600">
                    ×
                  </button>
                </span>
              )}
              {sortBy !== "default" && (
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  Sorted
                  <button onClick={() => setSortBy("default")} className="hover:text-purple-600">
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6 px-2">
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            {loading ? (
              "Loading products..."
            ) : (
              <>
                Showing <span className="font-bold text-blue-900 dark:text-blue-400">{filteredProducts.length}</span> of{" "}
                <span className="font-bold">{product.length}</span> products
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-64 bg-slate-200 dark:bg-slate-700"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
              <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">No Products Found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filters to find what you're looking for."
                : "There are no products available at the moment."}
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSortBy("default");
                }}
                className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 shadow-lg"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <Cards key={item._id || item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;
