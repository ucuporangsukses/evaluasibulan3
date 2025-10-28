import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../contexts/CartContext"; // <-- import cart

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart(); // <-- ambil cart

  // hitung total item
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
        >
          Products
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "text-yellow-400" : "")}
          >
            Dashboard
          </NavLink>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Cart icon */}
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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

        {/* Login/Logout */}
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
