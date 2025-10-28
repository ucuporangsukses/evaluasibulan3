import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../hooks/useProducts";
import { ProductForm } from "../components/ProductForm";

export const Dashboard: React.FC = () => {
  const { userRole, username } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  if (userRole !== "admin") {
    return <p className="text-center mt-10 text-red-500">Akses ditolak! (Khusus admin)</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin — {username}</h1>

      <h2 className="text-xl font-semibold mb-3">Tambah Produk</h2>
      <ProductForm onSubmit={addProduct} />

      <h2 className="text-xl font-semibold mt-8 mb-3">Kelola Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow bg-white flex flex-col gap-2">
            <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mx-auto" />
            <h3 className="font-bold">{product.title}</h3>
            <p className="text-orange-500 font-semibold">${product.price}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateProduct(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
