import React, { useState } from 'react';

// Main App component that renders the Navbar


// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo Section */}
        <div className="flex items-center">
          <a href="/" className="text-white text-2xl font-extrabold tracking-wide hover:text-blue-200 transition duration-300 ease-in-out">
            TSP-Line
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="/" text="Home" />
          <NavLink href="/email" text="Email" />
        </div>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white rounded-md p-2 transition duration-300 ease-in-out"
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              // Close icon (X) when menu is open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu (conditionally rendered) */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-blue-700 rounded-lg shadow-inner py-2 px-4">
          <MobileNavLink href="/" text="Home" onClick={toggleMenu} />
          <MobileNavLink href="/email" text="Email" onClick={toggleMenu} />
        </div>
      )}
    </nav>
  );
}

// Reusable component for desktop navigation links
function NavLink({ href, text }) {
  return (
    <a
      href={href}
      className="text-white text-lg font-medium hover:text-blue-200 hover:underline transition duration-300 ease-in-out transform hover:scale-105"
    >
      {text}
    </a>
  );
}

// Reusable component for mobile navigation links
function MobileNavLink({ href, text, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block text-white text-lg py-2 px-3 rounded-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:translate-x-1"
    >
      {text}
    </a>
  );
}
export default Navbar;