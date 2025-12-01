import React from "react";
import { HashLink } from "react-router-hash-link";

function Cards({ item }) {
  return (
    <div className="group">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative overflow-hidden h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name || "Product"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-20 h-20 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Category Badge */}
          {item.category && (
            <div className="absolute top-4 right-4">
              <span className="bg-blue-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                {item.category}
              </span>
            </div>
          )}

          {/* Price Badge */}
          {item.price && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-white/95 backdrop-blur-sm text-blue-900 px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                ${item.price}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
              {item.name || "Product Name"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {item.title || "Product description goes here..."}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <HashLink
              to="/contact#contact"
              className="block w-full text-center bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Buy Now
              </span>
            </HashLink>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default Cards;

