import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../contexts/CartContext";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart(); 

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    navigate("/products"); // auto ke halaman products
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/products")}>
        MyShop
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="flex-1 max-w-xl p-2 rounded border border-gray-300 focus:outline-none mx-4"
      />

      <div className="flex items-center gap-4">
        {/* Cart icon */}
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 3h2l.4 2M7 13h14l-1.35 6.75a1 1 0 01-.99.75H7.34a1 1 0 01-.99-.75L5 6H3"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>

        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
