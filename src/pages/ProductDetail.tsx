import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { userRole } = useAuth();

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  const handleAddToCart = () => {
    if (userRole !== "user") {
      alert("Cuma user yang bisa jajan bro 😆");
      return;
    }
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-64 h-64 object-contain mx-auto"
        />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500">{product.category}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-orange-500 font-bold text-2xl">${product.price}</p>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition w-40"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
