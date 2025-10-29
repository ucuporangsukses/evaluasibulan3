import React, { useEffect, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "../components/ProductCard";
import { ErrorBoundary } from "../components/ErrorBoundary";

interface ProductsProps {
  searchQuery: string;
}

export const Products: React.FC<ProductsProps> = ({ searchQuery }) => {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredProducts(
        products.filter(p => p.title.toLowerCase().includes(query))
      );
    }
  }, [searchQuery, products]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <ErrorBoundary>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} highlight={searchQuery} />
        ))}
      </div>
    </ErrorBoundary>
  );
};
