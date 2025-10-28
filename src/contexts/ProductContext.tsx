import { createContext, useContext, useState, useEffect, type ReactNode, } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = (product: Product) =>
    setProducts(prev => prev.map(p => (p.id === product.id ? product : p)));
  const deleteProduct = (id: number) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
};
