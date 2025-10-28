import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";

import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { Cart } from "./pages/Cart"; // ⬅️ Tambahin ini bro!!
import type { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export const App = () => (
  <Router>
    <AuthProvider>
      <ProductProvider>
        <CartProvider> {/* ⬅️ Bungkus biar cart global */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/cart" element={<Cart />} /> {/* ⬅️ INI DIA BRE!!! */}
          </Routes>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </Router>
);
