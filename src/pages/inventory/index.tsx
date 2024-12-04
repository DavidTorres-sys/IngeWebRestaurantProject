"use client";

import UnderLineTitle from "@/components/atoms/UnderLineTitle";
import InventoryCard from "@/components/molecules/InventoryCard";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT, DELETE_PRODUCT } from "@/utils/gql/mutations/product";
import { GET_PRODUCTS } from "@/utils/gql/queries/products";

import { convertBlobUrlToFile } from "@/lib/convert";
import { uploadImage } from "@/supabase/storage/client";
import { useSession } from "next-auth/react";

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description is too long"),
  price: z.number().positive("Price must be greater than 0"),
  special_instructions: z.string().optional(),
  category_id: z.string().min(1, "Category is required"),
  image_url: z.any().optional(),
});

const Inventory = () => {
  const { data: session, status } = useSession();
  if (session?.user.role !== 'ADMIN') return <div>Access Denied</div>;
  const [inventoryModal, setInventoryModal] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);
  const [deleteProduct, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_PRODUCT, {
      refetchQueries: [{ query: GET_PRODUCTS }],
    });

  const {
    loading: queryLoading,
    error: queryError,
    data: productsData,
  } = useQuery(GET_PRODUCTS, {
    onError: (error) => {
      console.error("GraphQL Query Error:", error);
    },
  });

  const closeModal = () => setInventoryModal(false);
  const openModal = () => {
    reset();
    setInventoryModal(true);
  };

  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [imageUpload, setImageUpload] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrl = URL.createObjectURL(filesArray[0]);

      setImageUrl([newImageUrl]);
    }
  };
  const [isPending, startTransition] = useTransition();

  const categoryOptions = ["Entries", "Pastas", "Pizzas"];
  const categoryValues = [
    "958bf6c9-cd06-4c4f-8306-d6afbf398f15",
    "187f1f83-14a0-4079-9526-f236b2ce5892",
    "a1746167-3a8c-4113-ad97-98d52580c906",
  ];

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      let uploadedImageUrl = "";

      // Subir la imagen primero
      if (imageUrl.length > 0) {
        try {
          const imageFile = await convertBlobUrlToFile(imageUrl[0]);

          const { imageUrl: newImageUrl, error } = await uploadImage({
            file: imageFile,
            bucket: "product-images",
          });

          if (error) {
            console.error("Error uploading image:", error);
            return; // Detener el proceso si hay un error al cargar la imagen
          }

          // Establecer la URL de la imagen cargada
          uploadedImageUrl = newImageUrl; // Guardamos la URL de la imagen cargada
          setImageUpload(uploadedImageUrl); // Opcional: Si deseas actualizar algún estado con la URL
        } catch (uploadError) {
          console.error("Error converting or uploading image:", uploadError);
          return; // Detener el proceso si hay un error durante la conversión o carga
        }
      }

      // Ahora que tenemos la URL de la imagen, enviamos los datos del producto
      try {
        await createProduct({
          variables: {
            data: {
              name: data.name,
              description: data.description,
              price: data.price,
              category_id: data.category_id,
              image_url: uploadedImageUrl, // Usar la URL de la imagen cargada
              special_instructions: data.special_instructions || "",
            },
          },
        });
        console.log("Product added successfully");
      } catch (error) {
        console.error("Error creating product:", error);
      } finally {
        setImageUpload(""); // Limpiar el estado de la URL de la imagen
        closeModal(); // Cerrar el modal
      }
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct({
        variables: {
          where: { id: productId }, // Envolviendo el id dentro del objeto 'where'
        },
      });
      console.log(`Product ${productId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div>
        <div className="w-full flex justify-end">
          <Button className="text-xs text-white" onClick={openModal}>
            Add Product
          </Button>
        </div>
        <UnderLineTitle title="Entries" />
        <div className="flex flex-wrap gap-3">
          {queryLoading && <p>Loading...</p>}
          {queryError && <p>Error: {queryError.message}</p>}
          {productsData &&
            productsData.products.map((product: any) =>
              product.category_id === "958bf6c9-cd06-4c4f-8306-d6afbf398f15" ? (
                <InventoryCard
                  key={product.id}
                  imageUrl={product.image_url}
                  title={product.name}
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              ) : null
            )}
        </div>

        <UnderLineTitle title="Pastas" />
        <div>
          {productsData &&
            productsData.products.map((product: any) =>
              product.category_id === "187f1f83-14a0-4079-9526-f236b2ce5892" ? (
                <InventoryCard
                  key={product.id}
                  imageUrl={product.image_url}
                  title={product.name}
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              ) : null
            )}
        </div>

        <UnderLineTitle title="Pizzas" />
        <div>
          {productsData &&
            productsData.products.map((product: any) =>
              product.category_id === "a1746167-3a8c-4113-ad97-98d52580c906" ? (
                <InventoryCard
                  key={product.id}
                  imageUrl={product.image_url}
                  title={product.name}
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              ) : null
            )}
        </div>
      </div>
      {inventoryModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative w-[500px] bg-white rounded-2xl p-5">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-4xl text-gray-600 hover:text-gray-800"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold mb-5">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className={`w-full border-2 ${
                    errors.name ? "border-red-500" : "border-primary"
                  } rounded-lg p-2`}
                />
                {errors.name && typeof errors.name.message === "string" && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  {...register("description")}
                  id="description"
                  className={`w-full border-2 ${
                    errors.description ? "border-red-500" : "border-primary"
                  } rounded-lg p-2`}
                ></textarea>
                {errors.description &&
                  typeof errors.description.message === "string" && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  id="price"
                  className={`w-full border-2 ${
                    errors.price ? "border-red-500" : "border-primary"
                  } rounded-lg p-2`}
                />
                {errors.price && typeof errors.price.message === "string" && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="category_id">Category</label>
                <select
                  {...register("category_id")}
                  id="category_id"
                  className={`w-full border-2 ${
                    errors.category_id ? "border-red-500" : "border-primary"
                  } rounded-lg p-2`}
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((option, index) => (
                    <option
                      key={categoryValues[index]}
                      value={categoryValues[index]}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500">
                    {String(errors.category_id.message)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="image_url">Image</label>
                <input
                  onChange={handleImageChange}
                  type="file"
                  id="image_url"
                  className="w-full border-2 border-primary rounded-lg p-2"
                  ref={imageInputRef}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="text-xs text-white"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Product"}
                </Button>
              </div>
              {error && <p className="text-red-500">Error: {error.message}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
