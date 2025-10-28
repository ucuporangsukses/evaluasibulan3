import React from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Products: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <ErrorBoundary>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </ErrorBoundary>
  );
};
