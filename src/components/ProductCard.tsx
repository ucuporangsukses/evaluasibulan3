import React from "react";
import type { Product } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-300 hover:scale-105 bg-white">
      <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mx-auto"/>
      <h3 className="font-bold mt-2 text-lg truncate">{product.title}</h3>
      <p className="text-orange-500 font-semibold mt-1">${product.price}</p>
      <Link to={`/products/${product.id}`} className="text-white bg-orange-500 px-3 py-1 rounded mt-2 inline-block hover:bg-orange-600 transition">
        Detail
      </Link>
    </div>
  );
};
