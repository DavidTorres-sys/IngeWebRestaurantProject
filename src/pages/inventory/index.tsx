"use client";

import UnderLineTitle from "@/components/atoms/UnderLineTitle";
import InventoryCard from "@/components/molecules/InventoryCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Inventory = () => {
  const [inventoryModal, setInventoryModal] = useState(true);

  return (
    <>
      <div>
        <div className="w-full flex justify-end">
          <Button className="text-xs text-white">Add Product</Button>
        </div>

        <UnderLineTitle title="Entries" />
        <InventoryCard />
      </div>
      {inventoryModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-[500px] h-[500px] bg-white rounded-2xl p-5">
            <h2 className="text-2xl font-semibold">Add Product</h2>
            <div className="w-full flex gap-3 mt-5">
              <div className="w-1/2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-2 border-primary rounded-lg p-2"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  className="w-full border-2 border-primary rounded-lg p-2"
                />
              </div>
            </div>
            <div className="w-full flex gap-3 mt-5">
              <div className="w-1/2">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  className="w-full border-2 border-primary rounded-lg p-2"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  className="w-full border-2 border-primary rounded-lg p-2"
                />
              </div>
            </div>
            <div className="w-full mt-5">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="w-full border-2 border-primary rounded-lg p-2"
              ></textarea>
            </div>
            <div className="w-full flex justify-end mt-5">
              <Button className="text-xs text-white">Add Product</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
