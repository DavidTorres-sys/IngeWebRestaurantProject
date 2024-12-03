"use client";

import UnderLineTitle from "@/components/atoms/UnderLineTitle";
import InventoryCard from "@/components/molecules/InventoryCard";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "@/utils/gql/mutations/product";
import { supabase } from "@/lib/supabaseClient";

import {convertBlobUrlToFile} from '@/lib/convert';
import { set } from "date-fns";
import { uploadImage } from "@/supabase/storage/client";

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description is too long"),
  price: z.number().positive("Price must be greater than 0"),
  special_instructions: z.string().optional(),
  category_id: z.string().min(1, "Category is required"),
  image_url: z.any().optional(), // Handle as file input
});

const Inventory = () => {
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

  const closeModal = () => setInventoryModal(false);
  const openModal = () => {
    reset();
    setInventoryModal(true);
  };

  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageUrl = URL.createObjectURL(filesArray[0]);

      setImageUrl([newImageUrl]);
    }
  };
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: any) => {
    startTransition(async () => {
      let urls = [];

      for(const url of imageUrl) {
        const imageFile = await convertBlobUrlToFile(url);

        const {imageUrl, error} = await uploadImage({
          file: imageFile,
          bucket: 'product-images'
        });

        if(error) {
          console.error(error);
          return;
        }

        urls.push(imageUrl);

        console.log(urls)

        setImageUrl([]);
      } 
    });

    closeModal();
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
        <InventoryCard />
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
                <label htmlFor="category_id">Category ID</label>
                <input
                  {...register("category_id")}
                  type="text"
                  id="category_id"
                  className={`w-full border-2 ${
                    errors.category_id ? "border-red-500" : "border-primary"
                  } rounded-lg p-2`}
                />
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

                {imageUrl.length > 0 && (
                  <img
                    src={imageUrl[0]}
                    alt="Product Image"
                    className="w-20 h-20 object-cover"
                  />
                )}
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
