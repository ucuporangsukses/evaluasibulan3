import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Product } from "../contexts/ProductContext";

interface Props {
  initialData?: Product;
  onSubmit: (product: Product) => void;
}

interface FormValues {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const ProductForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: initialData || {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    },
  });

  const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
    // simulasi delay biar keliatan isSubmitting
    await new Promise(res => setTimeout(res, 500));
    onSubmit({ id: initialData?.id || Date.now(), ...data });
    if (!initialData) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-3 p-4 bg-white rounded shadow-md">
      <div>
        <input
          {...register("title", { required: "Title wajib diisi" })}
          placeholder="Title"
          className="border p-2 rounded w-full"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <input
          type="number"
          {...register("price", { required: "Price wajib diisi", min: { value: 1, message: "Price harus lebih dari 0" } })}
          placeholder="Price"
          className="border p-2 rounded w-full"
        />
        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <input
          {...register("category", { required: "Category wajib diisi" })}
          placeholder="Category"
          className="border p-2 rounded w-full"
        />
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <input
          {...register("image", { required: "Image URL wajib diisi" })}
          placeholder="Image URL"
          className="border p-2 rounded w-full"
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
      </div>

      <div>
        <textarea
          {...register("description", { required: "Description wajib diisi" })}
          placeholder="Description"
          className="border p-2 rounded w-full"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`py-2 rounded text-white transition ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
      >
        {isSubmitting ? "Submitting..." : "Save"}
      </button>
    </form>
  );
};
