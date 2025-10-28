import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-40 mb-4 opacity-70"
        />
        <p className="text-gray-500 text-lg mb-4">
          Waduh... keranjang kamu kosong nih 😢
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
        >
          Belanja Sekarang 🛍️
        </button>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">
        🛒 Keranjang Belanja Kamu
      </h1>

      <div className="flex flex-col gap-6">
        {cart.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex items-center justify-between border-b pb-4 gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-contain rounded-md bg-gray-50"
              />
              <div>
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-gray-500">${product.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    disabled={quantity <= 1}
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-semibold text-lg text-orange-600">
                ${(product.price * quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-500 mt-2 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 border-t pt-4">
        <p className="text-xl font-bold">
          Total: <span className="text-orange-500">${totalPrice.toFixed(2)}</span>
        </p>
        <button
          onClick={() => alert("Checkout coming soon 💸")}
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
        >
          Checkout Sekarang
        </button>
      </div>
    </div>
  );
};
